import { Button, Card, Col, Form, Image, Input, Row, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Helper/AuthContext";
import axios from "axios";
import { trimstring } from "../Trim";
let secountry;
const AddForms = () => {
  const [formdata] = Form.useForm();
  const { user } = useContext(AuthContext);
  const [imgurl, setimgurl] = useState("");
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);

  const getcountry = async () => {
    const data = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    // console.log(data.data.data);

    setcountry(data.data.data);
    setcity([]);
    setstate([]);
    formdata.setFieldsValue({country:"",state:"",city:""})
  };
  const getstate = async (e) => {
    secountry = e;
    const data = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      { country: e }
    );
    // console.log(data.data.data.states);
    setstate(data.data.data.states);
    formdata.setFieldsValue({state:null})
    setcity([]);
  };
  const getcity = async (e) => {
    // console.log(secountry);
    const data = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      { country: secountry, state: e }
    );
    // console.log(data.data.data);
    formdata.setFieldsValue({city:null})
    setcity(data.data.data);
  };

  useEffect(() => {
    getcountry();
    formdata.setFieldsValue({ UserId: user.id,country:"" });
  }, []);
  const onFinish = (values) => {
    let {UserId,address,city,country,formGst,logo,name,phno,shortName,state}=values;
    address=address.toUpperCase()+" ,"+city.toUpperCase()+" ,"+state.toUpperCase()+" ,"+country.toUpperCase();
    formGst=formGst.toUpperCase();
    name=trimstring(name).toLowerCase();
    shortName=shortName.toUpperCase();
    values={UserId,address,formGst,logo,name,phno,shortName};
    console.log("Success:", values);

  };

  //for gst ,phno
  const GST_REGEX =
    /^([0-9]{2})([A-Z]{5})([0-9]{4})([A-Z]{1})([0-9]{1})([Z]{1})([0-9A-Z]{1})$/;
  const PHONE_REGEX = /^[0-9]{10}$/;
  const validateGST = (_, value) => {
    if (!value || GST_REGEX.test(value.toUpperCase())) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter a valid GST number"));
  };
  const validatePhoneNumber = (_, value) => {
    if (!value || PHONE_REGEX.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter a valid phone number"));
  };
  return (
    <div style={{ paddin: "20px" }}>
      <h1>Create New Form</h1>
      <Card
        style={{
          paddin: "20px",
          margin: "30px auto",
          width: "90%",
          position: "relative",
        }}
      >
        <Form
          form={formdata}
          name="basic"
          labelCol={{
            span: 9,
          }}
          wrapperCol={{
            span: 15,
          }}
          style={{
            maxWidth: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {imgurl !== "" && (
            <div style={{ position: "absolute", right: 10, top: 10 }}>
              <Image src={imgurl} height={150} />
            </div>
          )}
          <div style={{ width: "80%", display: "flex", margin: "30px auto" }}>
            <Form.Item
              label="UserId"
              name="UserId"
              hidden="true"
              rules={[
                {
                  required: true,
                  message: "Please input your Form name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Form name"
              name="name"
              style={{ width: "40%", margin: "0px auto" }}
              rules={[
                {
                  required: true,
                  message: "Please input your Form name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Form Gst no"
              name="formGst"
              style={{ width: "40%", margin: "0px auto" }}
              rules={[
                { required: true, message: "Please input your Form Gst no!" },
                { validator: validateGST },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ width: "80%", display: "flex", margin: "30px auto" }}>
            <Form.Item
              label="Phone Number"
              name="phno"
              style={{ width: "40%", margin: "0px auto" }}
              rules={[
                { required: true, message: "Please input your phone number" },
                { validator: validatePhoneNumber },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Area"
              name="address"
              style={{ width: "40%", margin: "0px auto" }}
              rules={[
                {
                  required: true,
                  message: "Enter Local area and House no!",
                },
              ]}
            >
              <Input.TextArea style={{ resize: "none" }} />
            </Form.Item>
          </div>
          <div style={{ width: "80%", display: "flex", margin: "30px auto" }}>
            <Form.Item
              label="Short Form name"
              name="shortName"
              style={{ width: "40%", margin: "0px auto" }}
              rules={[
                {
                  required: true,
                  message: "Please input your Form's Short name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Form's logo url"
              name="logo"
              style={{ width: "40%", margin: "0px auto" }}
              rules={[
                {
                  type: "url",
                  required: true,
                  message: "Please input your Form's Short name!",
                },
              ]}
            >
              <Input onChange={(e) => setimgurl(e.target.value)} />
            </Form.Item>
          </div>

          <div style={{ width: "80%", display: "flex", margin: "30px auto" }}>
            

            <Form.Item
              label="Country"
              name="country"
              style={{ width: "33%", margin: "0px auto" }}
              rules={[
                {
                  required: true,
                  message: "Enter Local area and House no!",
                },
              ]}
            >
              <Select onChange={(e) => getstate(e)}>
                {country.map((c, index) => {
                  return (
                    <Select.Option key={index} value={c.name} label={c.name}>
                      <img
                        src={c.flag}
                        alt={c.name}
                        style={{ width: "20px", marginRight: "18px" }}
                      />
                      {c.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          
          {state.length > 0 && (
            <Form.Item
              label="State"
              name="state"
              style={{ width: "33%", margin: "0px auto" }}
              rules={[
                {
                  required: true,
                  message: "select the State",
                },
              ]}
            >
              <Select key={state} onChange={(e) => getcity(e)}>
                {state.map((c, index) => {
                  return (
                    <Select.Option key={index} value={c.name} label={c.name} />
                  );
                })}
              </Select>
            </Form.Item>
          )}
          {city.length>0 && (
            <Form.Item
              label="City"
              name="city"
              style={{ width: "33%", margin: "0px auto" }}
              rules={[
                {
                  required: true,
                  message: "select the City",
                },
              ]}
            >
              <Select
                key={city}
            >
                {city.map((c, index) => {
                  return (
                    <Select.Option key={index} value={c} label={c}>
                      {c}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          </div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddForms;
