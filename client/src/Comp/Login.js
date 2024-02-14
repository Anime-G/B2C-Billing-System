import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState(0);
  const navigate = useNavigate();
  const [formdata] = Form.useForm();
  //0=login,1=register
  const bg = [
    window.location.origin + "/Image/LoginLogo.jpeg",
    window.location.origin + "/Image/RegistrationLogo.jpg",
  ];
  const bgstyle = {
    width: "50%",
    background: "url('" + bg[form] + "') top/cover",

    borderRadius: "10px 0 0 10px",
    transition: "all 0.5s ease-in-out",
  };
  const btbtn = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderRadius: "0px 0px 10px 0px",
    padding: 30,
    display: "flex",
    justifyContent: "center",
  };
  const loginform = (
    <React.Fragment>
      <Form.Item
        label="Emailid"
        name="emailid"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <FormItem wrapperCol={{
            span: 24,
          }}>
            <Row>

            
        <Col span={12}
        style={{textAlign:"right",color:"gray"}}
        >
          <a >Forgot password?</a>
        </Col>
        <Col span={12}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Col>
        </Row>
      </FormItem>
    </React.Fragment>
  );
  const Registrationform = (
    <React.Fragment>
      <Form.Item
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Emailid"
        name="emailid"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please input your Emailid!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Re-Password"
        name="confpassword"
        rules={[
          {
            required: true,
            message: "Please Confirm your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        style={{
          margin: "0px",
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </React.Fragment>
  );
  const onlogin = (values) => {
    console.log("Login Values :", values);
  };
  const onregister = (values) => {
    console.log("Registration Values :", values);
  };
  return (
    <div>
      {/* card */}
      <div
        style={{
          width: "50%",
          margin: "20px auto",
          padding: "0px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,.5)",
        }}
      >
        <div style={{ width: "100%", display: "flex", height: "450px" }}>
          {/* Img */}
          <div style={bgstyle}></div>
          {/* original form */}
          <div
            style={{
              borderRadius: "0 10px 10px 0",

              transition: "all .5s ease-in-out",
              width: "50%",
              height: "100%",

              position: "relative",
            }}
          >
            {/* //form div */}
            <div
              style={{
                height: "100%",
                borderRadius: "0 10px 10px 0",
                margin: " 0 auto",
                width: "90%",
                transition: "all .5s ease-in-out",
              }}
            >
              <h1>{form === 0 ? "Login" : "Registration"}</h1>
              <hr />
              <Form
                form={formdata}
                // key={bg}
                name="Registration"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                  margin: "0px auto",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={form === 0 ? onlogin : onregister}
                autoComplete="off"
              >
                {form ? Registrationform : loginform}
              </Form>
            </div>
            <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
              {!form ? (
                <Button
                  style={btbtn}
                  ghost="true"
                  type="primary"
                  onClick={() => setForm(1)}
                >
                  <UserAddOutlined /> Register
                </Button>
              ) : (
                <Button
                  style={{ ...btbtn, borderColor: "purple", color: "purple" }}
                  type="primary"
                  ghost="true"
                  onClick={() => setForm(0)}
                >
                  <LoginOutlined /> Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
