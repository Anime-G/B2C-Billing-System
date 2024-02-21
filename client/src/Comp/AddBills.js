import React, { useContext, useEffect, useState } from "react";
import { ServerApi } from "./Consts";
import axios from "axios";
import { AuthContext } from "../Helper/AuthContext";
import { Button, Card, DatePicker, Form, Input, InputNumber, Select, Table, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import Temp from "./Temp";
const AddBills = () => {
  const { user } = useContext(AuthContext);
  const { id } = user;
  const [formId,setFormId]=useState(null);
  const [form, setforms] = useState([]);
  // const [Bills, setBills] = useState([]);
  const [formdata] = Form.useForm();
 const navigate=useNavigate();
  const getformdata = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/" + id);
    if (data) {
      console.log(data.data);
      setforms(data.data);
    }
  };
  useEffect(() => {
    getformdata(id);
  }, []);
  const dateFormat = "DD-MM-YYYY";
  //table
  
  const onFinish = async (values) => {
    let {BillItems,FormId,Date,name,phno,InvoiceNo}=values;
    name=name.toLowerCase().trim();
    phno=phno.toLowerCase().trim();
    Date=Date.$y+"-"+(Date.$M+1)+"-"+Date.$D
    
    values={items:BillItems,FormId,Date,name,phno,InvoiceNo}
    console.log("result",values);
    const result=await axios.post(ServerApi+"/Bills/add",values)
    if (result){
      if (result.data.err) {
        message.error(result.data.err);
      } else {
        message.success(result.data.msg);
        navigate("/Bills/"+FormId);
      }
    } else {
      message.error("Internal Server Error");
    }
  };
  return (

    <div>
      <Card style={{ width: "95%", margin: "20px auto" }}>
        <h1 style={{ background: "rgba(0,0,0,.5)", color: "white" }}>
          {user?.name}
        </h1>
        <Form
          form={formdata}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: "100%",
          }}
          initialValues={{Date:dayjs()}}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <Form.Item
              label="Select Form"
              style={{ width: "30%" }}
              name="FormId"
              rules={[
                {
                  required: true,
                  message: "Please select Your Form!",
                },
              ]}
            >
              <Select key={form}  onChange={(e)=>setFormId(e)} >
                {form.map((f) => {
                  return (
                    <Select.Option key={f.id} value={f.id}>
                      {f.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Invoice No"
              name='InvoiceNo'
              style={{ width: "30%" }}
              rules={[
                {

                  required: true,
                  message: "Please Enter the Invoice Number!",
                },
              ]}
            >
              <InputNumber min="0" style={{width:"100%"}} />
            </Form.Item>
            <Form.Item
              label="Date"
               name='Date'
              style={{ width: "30%" }}
              rules={[
                {
                  required: true,
                  message: "Please select Billing Date!",
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginLeft: "40px",
              justifyContent: "start",
            }}
          >
            <Form.Item
              label="Client Name"
              name="name"
              style={{ width: "30%" }}
              rules={[
                {
                  required: true,
                  message: "Please Enter Client Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Client phno"
              style={{ width: "30%" }}
              name="phno"
              rules={[
                {
                  required: true,
                  message: "Please Enter Client Number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        {formId &&
          <Temp key={formId} formdata={formdata} formId={formId} />
        }
          <br/>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button icon={<PlusOutlined/>} type="primary" style={{background:"mediumseagreen"}} htmlType="submit">
               Add Bill
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddBills;
