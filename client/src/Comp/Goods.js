import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Helper/AuthContext";
import axios from "axios";
import { ProfileNavKey, ServerApi } from "./Consts";
import { Button, Card, Col, Form, Input, InputNumber, Modal, Pagination, Popconfirm, Result, Row, Select, Tooltip, message } from "antd";
import { trimstring } from "../Trim";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import FormList from "antd/es/form/FormList";

const Goods = () => {
  const { user } = useContext(AuthContext);
  const { id } = user;
  const [form, setforms] = useState(null);
  const [formdata] = Form.useForm();
  const [addform] = Form.useForm();
  const [upform]=Form.useForm();
  const [formlist, setformslist] = useState([]);
  const [goods,setgoods]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of cards per page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  let total;
  const getformsList = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/" + id);
    if (data) {
      setformslist(data.data);
      setforms('  ');
      formdata.setFieldsValue({form:''})
      // getformsGoods(data.data[0].id);
    }
  };
  const getGoods=async()=>{
    const data=await axios.get(ServerApi+"/Goods/"+user?.id);
    setgoods(data.data);
  }
  const getformsGoods=async(e)=>{
    console.log(e);
    if(e!="")
    {const data=await axios.get(ServerApi+"/Goods/form/"+e);

    setgoods(data.data);}
    else{
      getGoods();
    }
  }
  useEffect(() => {
    getformsList(user.id);
    getGoods();
  }, []);
  const getGoodsInfo=async (id)=>{
    const data=await axios.get(ServerApi+"/Goods/find/"+id);
    console.log("log :",data.data);
    const {FormId,GstRate,HsnCode,name}=data.data;
      
    upform.setFieldsValue({form:FormId,GstRate,HsnCode,id,name})
    showModalup(true);
  }
  const [visible, setVisible] = useState(false);
  const [visibleup, setVisibleup] = useState(false);
  const showModal = () => {
   
    setVisible(true);
  };
  const showModalup = () => {
   
    setVisibleup(true);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deletegood=async(id)=>{
    const data=await axios.delete(ServerApi+"/Goods/delete/"+id);
    if(data)
    {
      if(data.data.err)
      {
        message.error(data.data.err)
      }
      else
      {
        message.success(data.data.msg);
        
        getGoods();
      }
    }
  }
  const renderCards = () => {
    return goods.slice(startIndex, endIndex).map((item, index) => {
      const formgoods=formlist.filter(p=>item.FormId===p.id);
      // console.log(formgoods);
      return (
      <Card
        key={index}
        style={{
          margin: 20,
          background: "rgba(255,255,255,.4)",
          color: "white",
          width: 300,
          height: "150px",
          position: "relative",
        }}
        hoverable
      >
        <Tooltip
          placement="bottom"
          title={item.name }
        >
          <Meta
            title={item.name}
            description={
              <div
                style={{
                  maxHeight: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
               <Link to={"/"+ProfileNavKey} > Form: {formgoods[0]?.name} </Link><br/>
               <div style={{display:"flex",gap:20,justifyContent:"center"}}>

                <span>Hsn Code: {item.HsnCode}</span>
                <span>Gst Rate: {item.GstRate}%</span>
               </div>
              </div>
            }
          />
        </Tooltip>
        <Button
          onClick={()=>getGoodsInfo(item.id)}
          style={{
            position: "absolute",
            bottom: 0,
            width: "50%",
            left: 0,
            borderRadius: "0 0 0px 5px",
          }}
        >
          <EditOutlined
            key="edit"
            style={{ color: "blue", fontSize: "20px" }}
          />
        </Button>
        <Popconfirm
          title={"Delete the Product : "+item.name}
          description="Are you sure to delete this Product ,because it will also delete the Data from the Bills where it has been selected?"
          onConfirm={() => deletegood(item.id)}
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
        >
          <Button
            style={{
              position: "absolute",
              bottom: 0,
              width: "50%",
              right: 0,
              borderRadius: "0 0 5px 0",
            }}
          >
            <DeleteOutlined
              key="delete"
              style={{ color: "tomato", fontSize: "20px" }}
            />
          </Button>
        </Popconfirm>
      </Card>
    )});
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
  const handleOkup = () => {
    upform
      .validateFields()
      .then((values) => {
        onFinishup(values);
        upform.resetFields();
        setVisibleup(false);
      })
      .catch((errorInfo) => {
        // console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelup = () => {
    upform.resetFields();
    setVisibleup(false);
  };
  const onFinish = async(values) => {
    console.log("result ", values);
    let { form, name, HsnCode, GstRate }=values;
    name=trimstring(name.toLowerCase());
    HsnCode=trimstring(HsnCode);
    let FormId=form;
    values={FormId, name, HsnCode, GstRate}
    const data=await axios.post(ServerApi+"/Goods/add",values);
    if(data)
    {
      if(data.data.err)
      {
        message.error(data.data.err)
      }
      else
      {
        message.success(data.data.msg);
        getGoods();
      }
    }
  };
  const onFinishup = async(values) => {
   
    let { id,form, name, HsnCode, GstRate }=values;
    name=trimstring(name.toLowerCase());
    HsnCode=trimstring(HsnCode.toString());
    let FormId=form;
    values={FormId, name,id, HsnCode, GstRate}
    console.log("result ", values);
    const data=await axios.patch(ServerApi+"/Goods/update",values);
    if(data)
    {
      if(data.data.err)
      {
        message.error(data.data.err)
      }
      else
      {
        message.success(data.data.msg);
        getGoods();
      }
    }
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
  const Upmodal = (
    <Modal
      title={"Update the Goods"}
      centered
      open={visibleup}
      onOk={handleOkup}
      onCancel={handleCancelup}
    >
      <Form form={upform} layout="vertical">
      <Form.Item
          label="Good's id"
          name="id"
          hidden="true"
          rules={[{ required: true, message: "Please input Goods name!" }]}
        >
          <Input />
        </Form.Item>
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
          <h1>Goods in Form {goods.length>0 && "("+goods.length+")"} </h1>
          <Form
            form={formdata}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ form: form.id }}
            style={{ width: "98%" }}
          >
            <Row gutter={24}>
              <Col span={12}>
                 
                <Form.Item label="Select Form" name="form">
                  
                  <Select key={formlist} onChange={(e) =>{ getformsGoods(e);setforms(e)}}>
                  <Select.Option key={-20} value={""}>
                          All
                        </Select.Option>
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
                <Form.Item
                
                  style={{position:"absolute",right:0}}
                >
                  <Button onClick={showModal}>+ Add Goods</Button>
                </Form.Item>
                <br/>
              </Col>
            </Row>
          </Form>
          


          <div >
            {
              goods.length>0?
             (<div><div style={{ textAlign: "right", marginTop: 20 }}>
          <Pagination
            current={currentPage}
            total={goods.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
          }}
        >
          {renderCards()}
        </div>
        </div>
        )
              :
            <h1 align="center"> no Goods Found!</h1>
            }
          </div>
          {addmodal}
          {Upmodal}
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
