import React, { useEffect, useState } from "react";
import { Table, Button, Select, InputNumber, Form, Space, Tag, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { ServerApi } from "./Consts";

const { Option } = Select;

const Temp = ({ formdata, formid }) => {
  const [dataSource, setDataSource] = useState([{ key: 0 }]);
  const [count, setCount] = useState(1);
  const [goods, setGoods] = useState([]);
  const handleAddRow = () => {
    const newData = {
      key: count,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleRemoveRow = (keyToRemove) => {
    const updatedDataSource = dataSource.filter(
      (item) => item.key !== keyToRemove
    );
    setDataSource(updatedDataSource);
  };

  const getGoodsList = async () => {
    const id = formdata.getFieldValue(["FormId"]);
    const data = await axios.get(ServerApi + "/Goods/form/" + id);
    console.log(data.data);
    setGoods(data.data);
  };
  useEffect(() => {
    getGoodsList();
    setDataSource([{ key: 0 }])
  },[]);
  const columns = [
    {
      label: "Index",
      title: "#",
      key:(text, record, index) => index + 1,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Select",
      dataIndex: "select",
      width: 300,
      render: (_, record) => (
        <Form.Item
        noStyle
          name={["BillItems", record.key, "GoodsId"]}
          rules={[
            {
              required: true,
              message: "Please select Goods!",
            },
          ]}
          
        >
          <Select style={{width: "100%" }} onChange={(e)=>getGoods(e,record)} >
          {goods.map((f) => {
                  return (
                    <Select.Option key={f.id} value={f.id}>
                      {f.name}
                    </Select.Option>
                  );
                })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Qty",
      dataIndex: "number",
      
      render: (_, record) => (
        <Form.Item
        noStyle
          name={["BillItems", record.key, "qty"]}
          style={{ width: "100%" }} 
          rules={[
            {
              required: true,
              message: "Please Enter the Qty!",
            },
          ]}
        >
          <InputNumber
            min={0}
            
            onChange={() => setTotal(record)}
            placeholder="0"
          />
        </Form.Item>
      ),
    },
    {
      title: "rate",
      dataIndex: "number",

      render: (_, record) => (
        <Form.Item
        noStyle
        style={{ width: "100%" }} 
          name={["BillItems", record.key, "rate"]}
          rules={[
            {
              required: true,
              message: "Please Enter the Rate!",
            },
          ]}
        >
          <InputNumber
            min={0}
            
            onChange={() => setTotal(record)}
            placeholder="0"
          />
        </Form.Item>
      ),
    },
    {
      title: "Total",
      render: (_, record) => (
        <Form.Item name={["BillItems", record.key, "total"]}  noStyle >
          <InputNumber className="noinput" disabled />
        </Form.Item>
      ),
    },
    {
      title: "CGST",
      render: (_, record) => (
        <Form.Item name={["BillItems", record.key, "CGST"]} noStyle ><InputNumber className="noinput" disabled /></Form.Item>
      ),
    },   
    {
        title: "CGST Amt",
        render: (_, record) => (
          <Form.Item name={["BillItems", record.key, "CGSTAMT"]} noStyle ><InputNumber className="noinput" disabled  /></Form.Item>
        ),
      },
      {
        title: "SGST",
        render: (_, record) => (
          <Form.Item name={["BillItems", record.key, "SGST"]} noStyle ><InputNumber  className="noinput" disabled  /></Form.Item>
        ),
      },
      {
        title: "SGST Amt",
        render: (_, record) => (
          <Form.Item name={["BillItems", record.key, "SGSTAMT"]} noStyle><InputNumber className="noinput" disabled  /></Form.Item>
        ),
      },
      {
        title: "Total+Tax",
        render: (_, record) => (
          <Form.Item name={["BillItems", record.key, "TotalAmt"]} noStyle><InputNumber className="noinput" disabled  /></Form.Item>
        ),
      },
    {
        
      title: (
        <Button
          type="primary"
          onClick={handleAddRow}
          style={{ marginBottom: 16 }}
          icon={<PlusOutlined />}
        >
          
        </Button>
      ),
      dataIndex: "action",

      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            danger="true"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveRow(record.key)}
          >
            
          </Button>
        </Space>
      ),
    },
  ];
  const getGoods = async (id,record) => {
    
    const data = await axios.get(ServerApi + "/Goods/find/" + id);
    console.log(data.data);
    let CGST=data.data.GstRate/2;
    let SGST=CGST;
    formdata.setFieldValue(["BillItems", record.key, "CGST"],CGST);
    formdata.setFieldValue(["BillItems", record.key, "SGST"],SGST);
    setTotal(record)

  };
  const setTotal = (record) => {
    let qty = formdata.getFieldValue(["BillItems", record.key, "qty"]);
    let rate = formdata.getFieldValue(["BillItems", record.key, "rate"]);
    let total=(qty && rate)? qty * rate:0;
    formdata.setFieldValue(["BillItems", record.key, "total"], total.toFixed(2));
    let cgst=formdata.getFieldValue(["BillItems", record.key, "CGST"]);
    let sgst=formdata.getFieldValue(["BillItems", record.key, "SGST"]);
    const cgstamt=(total*cgst)/100
    formdata.setFieldValue(["BillItems", record.key, "CGSTAMT"],cgstamt.toFixed(2));
    const sgstamt=(total*sgst)/100
    formdata.setFieldValue(["BillItems", record.key, "SGSTAMT"],sgstamt.toFixed(2));
    const Total_Amt=total+cgstamt+sgstamt
    formdata.setFieldValue(["BillItems", record.key, "TotalAmt"],Total_Amt.toFixed(2));
    
    
  };
  
  return (
    <React.Fragment >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        noStyle
        bordered
        rowKey="key"
      ></Table>
    </React.Fragment>
  );
};

export default Temp;
