import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddBillsNavkey, ServerApi } from './Consts';
import { Button, Pagination, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Bills = () => {
  const {id}=useParams();
  const [form, setforms] = useState(null);
  const [Bills, setBills] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 20;
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


  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render:(record,index)=>index,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
    },
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
        columns={columns}
        dataSource={Bills}
        pagination={false} // Disable built-in pagination
      />
        <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      />
        </>
        :<h1>No Bills Created Yet!</h1>
  }
    
    </div>
  )
}

export default Bills
