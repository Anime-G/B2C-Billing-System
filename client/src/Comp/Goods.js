import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Helper/AuthContext";
import axios from "axios";
import { ServerApi } from "./Consts";
import { Button, Col, Form, Input, InputNumber, Modal, Result, Row, Select } from "antd";
import { trimstring } from "../Trim";

const Goods = () => {
  const { user } = useContext(AuthContext);
  const { id } = user;
  const [form, setforms] = useState(null);
  const [formdata] = Form.useForm();
  const [addform] = Form.useForm();
  const [formlist, setformslist] = useState([]);
  const getformsList = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/" + id);
    if (data) {
      setformslist(data.data);
      setforms(data.data[0]);
    }
  };
  useEffect(() => {
    getformsList(user.id);
  }, []);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
   
    setVisible(true);
  };

  const handleOk = () => {
    addform
      .validateFields()
      .then((values) => {
        onFinish(values);
        addform.resetFields();
        setVisible(false);
      })
      .catch((errorInfo) => {
        // console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancel = () => {
    addform.resetFields();
    setVisible(false);
  };
  const onFinish = async(values) => {
    console.log("result ", values);
    let { form, name, HsnCode, GstRate }=values;
    name=trimstring(name.toLowerCase());
    HsnCode=trimstring(HsnCode);
    values={form, name, HsnCode, GstRate}
    const data=await axios.post(ServerApi+"/Goods/add",values);
  };
  const addmodal = (
    <Modal
      title={"Add the Goods"}
      centered
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={addform} layout="vertical">
        <Form.Item label="Select Form" name="form">
          <Select key={formlist} onChange={(e) => setforms(e)}>
            {formlist.map((f) => {
              return (
                <Select.Option key={f.id} value={f.id}>
                  {f.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Good's name"
          name="name"
          rules={[{ required: true, message: "Please input Goods name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Good's hsn code"
          name="HsnCode"
          rules={[{ required: true, message: "Please input Goods HsnCode!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Good's Gst Rate"
          name="GstRate"
          rules={[{required: true, message: "Please input GST Rates!" }]}
        >
          <InputNumber min={1} max={80} style={{width:"100%"}}/>
        </Form.Item>
        
      </Form>
    </Modal>
  );
  return (
    <div
      key={formlist}
      style={{
        background: "white",
        width: "90%",
        margin: "20px auto",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      {formlist?.length != 0 ? (
        <div>
          <h1>Goods in Form</h1>
          <Form
            form={formdata}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ form: form.id }}
            style={{ maxWidth: "100%" }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Select Form" name="form">
                  <Select key={formlist} onChange={(e) => setforms(e)}>
                    {formlist.map((f) => {
                      return (
                        <Select.Option key={f.id} value={f.id}>
                          {f.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button onClick={showModal}>+ Add Goods</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div >
            <h1 align="center"> no Goods Found!</h1>
          </div>
          {addmodal}
        </div>
      ) : (
        <div>
          <Result
            status="500"
            title="Sorry, For Goods you need to create Form."
            subTitle="User > ?Form? > Goods"
          />
        </div>
      )}
    </div>
  );
};

export default Goods;
