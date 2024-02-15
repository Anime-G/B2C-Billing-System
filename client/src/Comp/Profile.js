import { Avatar, Button, Card, List, Result, Select, Tooltip } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Helper/AuthContext";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormAddNavkey } from "./Consts";


const Profile = () => {
  const { user } = useContext(AuthContext);
  const { id } = user;
  
  const [formlist, setformslist] = useState([]);
  const [form, setforms] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
    setforms(item);
  };
  const getforms = async (id) => {
    //fetch getforms
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card style={{ margin: "20px auto", width: "70%" }}>
          <h1>User info</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h3>
              Name:{" "}
              <tt>
                <b>{user.name}</b>
              </tt>
            </h3>
            <h3>
              Email-Id:{" "}
              <tt>
                <b>{user.emailid}</b>
              </tt>
            </h3>
          </div>
        </Card>
        <Card style={{ margin: "20px auto", width: "25%" }}>
          <h1 align="center">Forms <Link to={"/"+FormAddNavkey}><Tooltip title="Add Form" ><Button ><PlusOutlined /></Button></Tooltip></Link></h1>
          <hr/>
          {formlist.length == 0 ? (
            <h4>No Forms Are created Yet!</h4>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={formlist}
              style={{ height: "120px", overflowY: "scroll" }}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{
                    textAlign: "left",
                    backgroundColor:
                      item === activeItem ? "mediumseagreen" : "transparent",
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={
                      <span
                        style={{
                          color: item === activeItem ? "white" : "black",
                        }}
                      >
                        {item}
                      </span>
                    }
                    //  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
     {form  && ( <div style={{ display: "flex" }}>
        <Card style={{ margin: "20px auto", width: "70%" }}>
          <h1>Selected Form Info</h1>
          {form === null ? (
            <Result status={404} title="No Form is Selected!" />
          ) : (
            console.log(form)
          )}
        </Card>
        <Card style={{ margin: "20px auto", width: "25%" }}>
          <h1>Extra Info</h1>
          {form  === null ? (
            <Result status={404} title="No Form is Selected!" />
          ) : console.log(form)}
        </Card>
      </div>)}
    </div>
  );
};

export default Profile;
