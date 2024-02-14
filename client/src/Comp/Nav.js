import React, { useContext, useState } from 'react'
import {Menu} from 'antd'
import { HomeOutlined, LoginOutlined } from '@ant-design/icons'
import { Link, Route, Routes } from 'react-router-dom'
import _ from 'lodash'
import { AuthContext } from '../Helper/AuthContext'
import { HomeNavkey, LoginNavkey } from './Consts'
import Home from './Home'
import Login from './Login'
const Nav = () => {
    const {user}=useContext(AuthContext);

    const items = [
        {
          label: (<Link to="/" >Home</Link>),
          key: HomeNavkey,
          icon: <HomeOutlined />,
        },]
        
    
    if(!user.id)
    {
        //for login
        items.push({
            label: (<Link to={"/"+LoginNavkey} >Login</Link>),
            key: LoginNavkey,
            style:{position:"absolute",right:0},
            icon: <LoginOutlined />,
          },)
    }
    let path=_.last((window.location.href).split("/"));
    path=(path==="")?HomeNavkey:path;
    
    const [current, setCurrent] = useState(path);
        const onClick = (e) => {
          
          setCurrent(e.key);
        };
  return (
    <React.Fragment>
      <Menu style={{zIndex:2000,position:"sticky",top:0}} theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Routes >
        <Route path={"/"} element={<Home/>} />
        <Route path={"/"+LoginNavkey} element={<Login/>} />
      </Routes>
    </React.Fragment>
  )
}

export default Nav
