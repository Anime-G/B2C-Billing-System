import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  List,
  Result,
  Row,
  Select,
  Tag,
  Tooltip,
  Watermark,
} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Helper/AuthContext";
import { EditOutlined, FolderViewOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormAddNavkey, FormsEditNavkey, ServerApi } from "./Consts";



const Profile = () => {
  const { user } = useContext(AuthContext);
  const { id } = user;
  
  const [formlist, setformslist] = useState([]);
  const [form, setforms] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    if(activeItem===item)
    {
      setActiveItem(null);
      setforms(null)
    }
    else
    {
    getformdata(item);
    setActiveItem(item === activeItem ? null : item);
    setforms(item);
  }
  };
  const getformsList = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/" + id);
    if (data) {
      setformslist(data.data);
    }
  };
  const getformdata = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/find/" + id);
    if (data) {
      setforms(data.data);
    }
  };
  useEffect(() => {
    getformsList(user.id);
  }, []);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card style={{ margin: "20px auto", width: "70%" }}>
          <h1>User info</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h3>
              Name:{" "}
              <tt>
                <Tag color="green">
                  <b>{user.name}</b>
                </Tag>
              </tt>
            </h3>
            <h3>
              Email-Id:{" "}
              <tt>
                <Tag color="blue">
                  <b>{user.emailid}</b>
                </Tag>
              </tt>
            </h3>
          </div>
        </Card>
        <Card style={{ margin: "20px auto", width: "25%" }}>
          <h1 align="center">
              Forms {formlist.length == 0 ?"":"["+formlist.length+"]"}{" "}
            <Link to={"/" + FormAddNavkey}>
              <Tooltip title="Add Form">
                <Button>
                  <PlusOutlined />
                </Button>
              </Tooltip>
            </Link>
          </h1>
          <hr />
          {formlist.length == 0 ? (
            <h4>No Forms Are created Yet!</h4>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={formlist}
              style={{ height: "150px", overflowY: "scroll" }}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{
                    textAlign: "left",
                    justifyContent: "center",
                    backgroundColor:
                      item.id === activeItem ? "mediumseagreen" : "transparent",
                  }}
                  onClick={() => handleItemClick(item.id)}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.logo}
                        style={{ margin: "0px 10px", borderRadius: "2px"}}
                        height={50}
                      />
                    }
                    title={
                      <div style={{display:"block"}}>
                      <span
                        style={{ textAlign:"center",
                          color: item.id === activeItem ? "white" : "black",
                        }}
                      >
                        {item.name}
                      </span>
                      <div>
                        <Link to={"/"+FormsEditNavkey+"/"+item.id} ><Button><FolderViewOutlined /></Button></Link>
                      </div>
                      </div>
                    }
                    //  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
      {form && (
        <div style={{ display: "flex" }}>
          <Card style={{ margin: "20px auto",textAlign:"left", width: "70%",background:"mediumseagreen" }}>
        
            {form === null ? (
              <Result status={404} title="No Form is Selected!" />
            ) :(
              
              <div style={{zIndex:3,transition:"all .5s ease-in-out"}}>
                
                <h1 style={{textAlign:"center "}}>
                  {form.name} [{form.shortName}]
                </h1>
               
                <Row gutter={24}>
                  <Col span={4}>
                    <Image src={form.logo} style={{ zIndex:3,borderRadius: "2px",maxWidth:"250px",maxHeight:"200px"}} />

                  </Col>
                  <Col span={20}>
                  <hr/>
                    <Row gutter={24}>
                      <Col span={10}>
                        Name :{" "}
                        <Tag color="green">
                          <b> {form.name}</b>
                        </Tag>
                      </Col>
                      <Col offset={2} span={10}>
                        Short Name:{" "}
                        <Tag color="purple">
                          <b> {form.shortName}</b>
                        </Tag>
                      </Col>
                      </Row>
                      <br/>
                      <Row gutter={24}>
                      <Col
                        
                        span={10}
                        style={{
                        
                          userSelect: "text",
                        }}
                      >
                        phone no:{" "}
                        <Tag color="red">
                          <b> {form.phno}</b>
                        </Tag>
                      </Col>
                      <Col  offset={2} span={10} >
                        Gst No:{" "}
                        <Tag color="processing">
                          <b> {form.formGst}</b>
                        </Tag>
                      </Col>
                     
                    </Row>
                    <Row gutter={24}>

                    <Col span={22} style={{ margin: "20px 0" }}>
                        Address: <b> {form.address}</b>
                      </Col>
                    </Row>
                  </Col>
                </Row>

              </div>
         
                      )}
          </Card>
          <Card style={{ margin: "20px auto", width: "25%" }}>
            <h4>About {form.name}</h4>
            
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
