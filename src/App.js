import { useEffect, useState } from 'react';
import './App.css';
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth , API, graphqlOperation } from 'aws-amplify';
import { listUserKeys, getUser, listUsers } from './graphql/queries';
import Register from './components/Register';
import SignIn from './components/SignIn';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { UserContext } from './context/UserContext';
import { KContext } from './context/KContext';
import jwt from 'jsonwebtoken';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [k, setK] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(async(res) => {
      const sub = res.attributes.sub;
      await API   
        .graphql(graphqlOperation(listUserKeys, { input: { filter: { userID : { eq : sub } } } } ))
        .then(async(res) => {
            if (res.data.listUserKeys.items.length === 0) {
              Toast.fail("No user found [1]", 2);
              Auth.signOut();
              window.location = "/";
            } else if (res.data.listUserKeys.items.length > 1) {
              Toast.fail("Can't find user : multiple [1]", 2);
              Auth.signOut();
              window.location = "/";
            } else {
              const k = res.data.listUserKeys.items[0];
              await API
              .graphql(graphqlOperation(listUsers, { input: { filter: { owner : { eq : sub } } } } ))
                .then(res => {
                  if (res.data.listUsers.items.length === 0) {
                    Toast.fail("No user found [2]", 2);
                  } else if (res.data.listUsers.items.length > 1) {
                    Toast.fail("Can't find user : multiple [2]", 2);
                  } else {
                    const d = res.data.listUsers.items[0];
                    try {
                      const u = jwt.verify(d.data, k.id);
                      // console.log(u);
                      setUser(u);
                      setK({  ukID : k.id, uID: d.id });
                      Toast.success("Signed in.", 1);
                    } catch(err) {
                      console.log(err);
                      Toast.fail("Error loading user.")
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                  Toast.fail("Error loading user.")
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
      setIsAuthenticated(true);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setIsAuthenticated(false);
      setLoading(false);
    })
    
  }, []);
  return (
    <Router>
      <div className="App">
        { loading ?  
          <ActivityIndicator size="large" /> 
        : 
          <>
            { isAuthenticated ? 
            <UserContext.Provider value={user}>
              <KContext.Provider value={k}>
              < Home />
              </KContext.Provider>
            </UserContext.Provider>
             : 
              <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/" component={Register} />
              </Switch>
            }
          </>
        }
        
         
      </div>
    </Router>
  );
}

export default App;
