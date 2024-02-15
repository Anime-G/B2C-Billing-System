import React, { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import _ from "lodash";
import { AuthContext } from "../Helper/AuthContext";
import {
  FormAddNavkey,
  HomeNavkey,
  LoginNavkey,
  LogoutNavKey,
  ProfileNavKey,
  UserNavKey,
} from "./Consts";
import Home from "./Home";
import Login from "./Login";
import Page404 from "./Page404";
import DispHome from "./DispHome";
import Profile from "./Profile";
import AddForms from "./AddForms";
const Nav = () => {
  const { user, setuser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setuser({});
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: HomeNavkey,
      icon: <HomeOutlined />,
    },
  ];
  if (!user?.id) {
    //for login
    items.push({
      label: <Link to={"/" + LoginNavkey}>Login</Link>,
      key: LoginNavkey,
      style: { position: "absolute", right: 0 },
      icon: <LoginOutlined />,
    });
  } else {
    items.push({
      label: user.name,
      key: UserNavKey,
      style: { position: "absolute", right: 0 },
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to={"/" + ProfileNavKey}>Profile</Link>,
          key: ProfileNavKey,
          icon: <ProfileOutlined />,
        },
        {
          label: "Logout",
          key: LogoutNavKey,
          onClick: () => logout(),
          icon: <ProfileOutlined />,
        },
      ],
    });
  }
  let path;
  useEffect(() => {
    path = _.last(window.location.href.split("/"));
    path = path === "" || path === "localhost:3000" ? HomeNavkey : path;

    setCurrent(path);
  });
  const [current, setCurrent] = useState(path);
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <React.Fragment>
      <Menu
        style={{ zIndex: 2000, position: "sticky", top: 0 }}
        theme="dark"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Routes>
        <Route path={"/"} element={user.id ? <Home /> : <DispHome />} />
        {!user.id && <Route path={"/" + LoginNavkey} element={<Login />} />}
        {user.id ? (
          <>
            <Route path={"/" + ProfileNavKey} element={<Profile />} />
            <Route path={"/" + FormAddNavkey} element={<AddForms />} />
          </>
        ) : (
          ""
        )}
        <Route path={"*"} element={<Page404 />} />
      </Routes>
    </React.Fragment>
  );
};

export default Nav;
