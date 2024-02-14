import logo from './logo.svg';
import './App.css';
import Nav from './Comp/Nav';
import { AuthContext } from './Helper/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerApi } from './Comp/Consts';
import { message } from 'antd';

function App() {
  const [user,setuser]=useState({});
  const getuser=async()=>{
    const data=axios.post(ServerApi+"/Users/auth",{headers:{accessToken:localStorage.getItem("accessToken")}});
    if(data)
    {
      console.log(data.data);
      if(data?.data?.err)
      {
        message.error(data?.data?.err);
      }
      else{

        setuser(data.data);
      }
    }
  }
  useEffect(()=>{
    getuser();
  },[])
  return (
    <AuthContext.Provider value={{user,setuser}}>
      
    <div className="App" style={{userSelect:"none"}}>
      <Nav/>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
