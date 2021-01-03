import { useEffect, useState } from 'react';
import './App.css';
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Register from './components/Register';
import SignIn from './components/SignIn';
import { ActivityIndicator } from 'antd-mobile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(res => {
      console.log(res);
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
            { isAuthenticated ? <Home /> : 
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
