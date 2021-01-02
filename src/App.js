import { useEffect } from 'react';
import './App.css';
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  useEffect(() => {

  }, []);
  return (
    <Router>
    <div className="App">
      <Home />
    </div>
    </Router>
  );
}

export default App;
