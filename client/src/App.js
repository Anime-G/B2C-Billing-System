import logo from './logo.svg';
import './App.css';
import Nav from './Comp/Nav';
import { AuthContext } from './Helper/AuthContext';
import { useState } from 'react';

function App() {
  const [user,setuser]=useState({});
  return (
    <AuthContext.Provider value={{user,setuser}}>
      
    <div className="App" style={{userSelect:"none"}}>
      <Nav/>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
