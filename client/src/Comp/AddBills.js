import React, { useContext, useEffect, useState } from 'react'
import { ServerApi } from './Consts';
import axios from 'axios';
import { AuthContext } from '../Helper/AuthContext';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';


const AddBills = () => {
  const {user}=useContext(AuthContext);
  const {id}=user;
  const [form, setforms] = useState([]);
  // const [Bills, setBills] = useState([]);
  const [formdata]=Form.useForm();
  const onFinish=async(values)=>{

  }
  const getformdata = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/" + id);
    if (data) {
      console.log(data.data);
      setforms(data.data);
    }
  };
  useEffect(()=>{
    getformdata(id);
  },[])
  const dateFormat = 'DD-MM-YYYY';

  return (
    <div>
      
      <Card style={{width:"90%",margin:"20px auto",}}>
    <h1 style={{background:"rgba(0,0,0,.5)",color:'white'}}  >{user?.name}</h1>
      
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
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div style={{display:"flex",gap:"20px",justifyContent:"center"}} >
          <Form.Item
          label="Select Form"
          style={{width:"30%"}}
          name="FormId"
          rules={[
            {
              required: true,
              message: 'Please select Your Form!',
            },
          ]}
          >
           <Select key={form} >
                  
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
          label="Invoce No"
          style={{width:"30%"}}
          rules={[
            {
              required: true,
              message: 'Please Enter the Invoice Number!',
            },
          ]}
          >
           <Input/>
          
          </Form.Item>
          <Form.Item
          label="Date"
          style={{width:"30%"}}
          rules={[
            {
              required: true,
              message: 'Please select Billing Date!',
            },
          ]}
          >
           <DatePicker  defaultValue={dayjs()} format={dateFormat} style={{width:"100%"}} />
          
          </Form.Item>
          </div>
          <div style={{display:"flex",gap:"30px",marginLeft:"40px",justifyContent:"start"}} >
          <Form.Item
          label="Client Name"
          style={{width:"30%"}}
          rules={[
            {
              required: true,
              message: 'Please Enter Client Name!',
            },
          ]}
          >
           <Input/>
          
          </Form.Item>
          <Form.Item
          label="Client phno"
          style={{width:"30%"}}
          rules={[
            {
              required: true,
              message: 'Please Enter Client Number!',
            },
          ]}
          >
           <Input/>
          
          </Form.Item>
          
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
  )
}

export default AddBills
