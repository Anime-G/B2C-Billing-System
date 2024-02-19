import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProfileNavKey, ServerApi } from "./Consts";
import { AuthContext } from "../Helper/AuthContext";
import { trimstring } from "../Trim";
import { Button, Card, Form, Image, Input, Select, message } from "antd";
let secountry;
const FormEdit = () => {
  const params = useParams();
  const { id } = params;
  const [form, setforms] = useState(null);
  const [formdata] = Form.useForm();
  const { user } = useContext(AuthContext);
  const [imgurl, setimgurl] = useState("");
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const navigate = useNavigate();
  const getcountry = async () => {
    const data = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    // console.log(data.data.data);

    setcountry(data.data.data);
    setcity([]);
    setstate([]);
    formdata.setFieldsValue({ country: "", state: "", city: "" });
  };
  function capitalizeFirstLetter(string) {
    // Split the string into words
    let words = string.split(' ');
  
    // Capitalize the first letter of each word and convert the rest to lowercase
    let capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  
    // Join the words back together into a single string
    let capitalizedString = capitalizedWords.join(' ');
  
    return capitalizedString;
  }
  const getstate = async (e) => {
    secountry = e;
    const data = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      { country: e }
    );
    // console.log(data.data.data.states);
    setstate(data.data.data.states);
    
    setcity([]);
  };
  const getcity = async (e) => {
    // console.log(secountry.trim(),":",capitalizeFirstLetter(e).trim());
    const data = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",{ country: secountry.trim(), state: e.trim() });
   
    setcity(data.data.data);
  };

  useEffect(() => {
    getcountry();
    formdata.setFieldsValue({ UserId: user.id, country: "" });
  }, []);
  const onFinish = async (values) => {
    let {
      UserId,
      address,
      city,
      id,
      country,
      formGst,
      logo,
      name,
      phno,
      shortName,
      state,
    } = values;
    address =
      trimstring(address.trim().replace(/^,|,$/g, '').toUpperCase()) +
      " ," +
      city.toUpperCase() +
      " ," +
      state.toUpperCase() +
      " ," +
      country.toUpperCase();
    formGst = formGst.toUpperCase();
    name = trimstring(name).toLowerCase();
    shortName = shortName.toUpperCase();
    values = { UserId ,id, address, formGst, logo, name, phno, shortName };
    console.log("Success:", values);
    const result = await axios.patch(ServerApi + "/Forms/update", values);
    if (result) {
      if (result.data.err) {
        message.error(result.data.err);
      } else {
        message.success(result.data.msg);
        navigate("/" + ProfileNavKey);
      }
    } else {
      message.error("Internal Server Error");
    }
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
  const getformdata = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/find/" + id);
    if (data) {
      console.log(data.data);
      let { UserId, address, formGst, logo, name, phno, shortName } = data.data;
      let lastIndex = (address).lastIndexOf(",");

      // Find the index of the 4th last comma
      let fourthLastIndex = address.lastIndexOf(
        ",",
        address.lastIndexOf(",", address.lastIndexOf(",") - 1) - 1
      );

      // Remove the string from the end up to the 4th last comma
      let newAddress = address.substring(0, fourthLastIndex);
      let parts = address.split(",");

      // Get the last three values from the array
      let lastThreeValues = parts.slice(-3);
      getstate(lastThreeValues[2]);
      secountry=capitalizeFirstLetter(lastThreeValues[2])
      getcity(capitalizeFirstLetter(lastThreeValues[1]));
      formdata.setFieldsValue({
        id,
        address: newAddress,
        city: capitalizeFirstLetter(lastThreeValues[0]),
        state: capitalizeFirstLetter(lastThreeValues[1]),
        country: capitalizeFirstLetter(lastThreeValues[2]),
        name,UserId,formGst,logo,phno,shortName
      });
      
      setimgurl(logo);
      setforms(data.data);
    }
  };
  useEffect(() => {
    getformdata(id);
  }, []);

  return (
    <div>
      
      <h1>Update Form</h1>
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
              <Image src={imgurl} style={{ height: 150, maxWidth: "180px" }} />
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
                  message: "Please input your id!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="id"
              name="id"
              hidden="true"
              rules={[
                {
                  required: true,
                  message: "Please input your Form id!",
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
              <Select key={country} onChange={(e) => getstate(e)}>
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

            {
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
                <Select  key={state} onChange={(e) => { console.log(e); return  getcity(e)}}>
                  {state.map((c, index) => {
                    return (
                      <Select.Option
                        key={index}
                        value={c.name}
                        label={c.name}
                      />
                    );
                  })}
                </Select>
              </Form.Item>
            }
            {
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
                <Select key={city}>
                  {city.map((c, index) => {
                    return (
                      <Select.Option key={index} value={c} label={c}>
                        {c}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            }
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
            <Link to={"/"+ProfileNavKey} > <Button >
              Cancel
            </Button></Link>
          </Form.Item>
          
        </Form>
      </Card>
    </div>
  );
};

export default FormEdit;
