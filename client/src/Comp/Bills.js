import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddBillsNavkey, ServerApi, ShowBillsNavkey } from './Consts';
import { Button, Pagination, Popconfirm, Table, message } from 'antd';
import { DeleteOutlined, EyeOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';

const Bills = () => {
  const {id}=useParams();
  const [form, setforms] = useState(null);
  const [Bills, setBills] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = Bills.length;
  const getformdata = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/find/" + id);
    if (data) {
      setforms(data.data);
    }
  };
  const getBillsdata = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Bills/" + id);
    if (data) {
      setBills(data.data);
    }
  };
  useEffect(()=>{
    getformdata(id);
    getBillsdata(id);
  },[currentPage, pageSize])

  const deleteBill = async (bid) => {
    //fetch getforms
    const result = await axios.delete(ServerApi + "/Bills/delete/" + bid);
    if (result) {
      if (result.data.err) {
        message.error(result.data.err);
      } else {
        message.success(result.data.msg);
        getBillsdata(id);
      }
    } else {
      message.error("Internal Server Error");
    }
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render:(text,record,index)=>index+1,
    },
    {
      title: 'Name',
      dataIndex: 'id',
      key: 'name',
      render:(text,record,index)=>{
        console.log(record);
       return record.Form.shortName+"-"+record.InvoiceNo+"-"+record.Client.name
      },
    },
    {
      title: 'Invoice No',
      dataIndex: 'InvoiceNo',
      key: 'age',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'address',
      render:(text,record)=>{
        var  mydate = new Date(record.Date);
       return (mydate.getDate()+"/"+(mydate.getMonth()+1)+"/"+mydate.getFullYear());
      }
    },
    {
      title: 'Actions',
      dataIndex: 'Date',
      key: 'address',
      render:(text,record)=>{
       return (<div style={{display:"flex",gap:10}}>
       <Link to={"/"+ShowBillsNavkey+"/"+record.id} ><Button type='primary' ><EyeOutlined  />/<PrinterOutlined /></Button></Link>
       <Popconfirm
    title="Delete the Bill"
    description={"Are you sure to delete this "+record.Form.shortName+"-"+record.InvoiceNo+"-"+record.Client.name+"?"}
    onConfirm={()=>deleteBill(record.id)}
   
    okText="Yes"
    cancelText="No"
  >
    <Button type='primary' danger><DeleteOutlined /></Button>
  </Popconfirm></div>)
      }
    }
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <div>
        <h1 style={{background:"rgba(0,0,0,.7)",color:"white",padding:10}}>{form?.name} [ {form?.shortName}   ] </h1>
        <h1 align="right" style={{width:"95%",margin:"10px auto"}} ><Link to={"/"+AddBillsNavkey} ><Button type='primary' style={{background:"green"}} ><PlusOutlined/>Create Bill</Button></Link></h1>
        <br/>
        {
          Bills?.length>0
          ?
          <>
        <Table
        style={{width:"90%",margin:"10px auto"}}
        columns={columns}
        dataSource={Bills}
        pagination={false} // Disable built-in pagination
      />
        <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      />
        </>
        :<h1>No Bills Created Yet!</h1>
  }
    
    </div>
  )
}

export default Bills
