import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
const authtoken = localStorage.getItem('auth-token');
const [alert, setAlert] = useState(null)
const showAlert = (message, type) =>{
  setAlert({
    msg: message,
    type: type
  })
  setTimeout(() => {
    setAlert(null);
  }, 1500);
} 
  return (

  <Router>
    <Routes>
      <Route path="/" element={  <Home showAlert={showAlert} alert={alert} />  } />
      <Route path="/login" element={ <Login showAlert={showAlert} />}/>
      <Route path="/register" element={<Register showAlert={showAlert} />}/>
    </Routes>
    
  </Router>
  );
}

export default App;
