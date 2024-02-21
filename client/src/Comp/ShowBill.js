import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ServerApi, convertAmountToWords } from "./Consts";
import { useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
// import './media.print.css'
const ShowBill = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const [BillDetail, setDetails] = useState({});
  let FinalTotal = 0;
  const getBill = async () => {
    const data = await axios.get(ServerApi + "/Bills/showBill/" + id);
    setDetails(data.data[0]);
  };
  useEffect(() => {
    getBill();
  }, []);
  const { Form, Client, BillItems, InvoiceNo } = BillDetail;
  var mydate = new Date(BillDetail?.Date);
  let date =
    mydate.getDate() +
    "-" +
    (mydate.getMonth() + 1) +
    "-" +
    mydate.getFullYear();
  
    const handlePrint = () => {
        const printableElement = componentRef.current;
    
        // Hide the button and other elements you don't want to print
        const originalDisplay = printableElement.style.display;
        printableElement.style.display = 'block';
    
        // Print only the content inside the card
        window.print();
    
        // Restore the original display property
        printableElement.style.display = originalDisplay;
      };
  return (
    <div style={{}}>
      <div style={{ width: "100%", margin: "20px auto" }} class="hide">
        <Button type="primary" onClick={handlePrint}>
          <PrinterOutlined />
        </Button>
      </div>
      <Card style={{ width: "100%", margin: "30px auto" }} ref={componentRef}
          id="Printcard">
        <table
          border="2"
          style={{ width: "100%", margin: "0px auto" }}
          
        >
          <tr>
            <td
              border="2"
              width={"50%"}
              style={{ padding: 0 }}
              colSpan={3}
              align="left"
              rowSpan={4}
            >
              <div
                style={{
                  textAlign: "left",
                  padding: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <b>{Form?.name}</b>
                  <p>
                    Phno :<b> {Form?.phno}</b>
                  </p>
                  <p>
                    GstNo :<b> {Form?.formGst}</b>
                  </p>
                </div>
                <img src={Form?.logo} height={95} />
              </div>
              <p style={{ textAlign: "left", paddingLeft: 10, margin: 0 }}>
                Address:<b> {Form?.address}</b>
              </p>
            </td>
            <td colSpan={3} width={"fit-content"} height={"fit-content"}>
              <b>Invoice No : {InvoiceNo}</b>
            </td>
            <td colSpan={3}>
              <b>Date : {date}</b>
            </td>
          </tr>
          <tr align="center">
            <td colSpan={6} style={{ fontWeight: 900 }}>
              Note: This Bill is Genereated From Computer
            </td>
          </tr>
          <tr>
            <td colSpan={6}>
              <b>Client Details</b>
            </td>
          </tr>
          <tr>
            <td width={"30%"} colSpan={3}>
              <b>name : {Client?.name}</b>
            </td>
            <td colSpan={3} width={"30%"}>
              <b>Phone number : {Client?.phno}</b>
            </td>
          </tr>
          <tr>
            <td>#</td>
            <td>Product</td>
            <td>hsn Code</td>
            <td>Qty</td>
            <td>Rate</td>
            <td>Amount</td>
            <td>CGST</td>
            <td>SGST</td>
            <td>Total</td>
          </tr>
          {BillItems?.map((item, index) => {
            console.log(item);
            let cgst = item.Good.GstRate / 2;
            let sgst = item.Good.GstRate / 2;
            let qty = parseFloat(item.Qty);
            let rate = parseFloat(item.rate);
            let total = (qty * rate).toFixed(2);
            let cgstamt = ((total * cgst) / 100).toFixed(2);
            let sgstamt = ((total * sgst) / 100).toFixed(2);
            let Totalamt = (
              parseFloat(total) +
              parseFloat(cgstamt) +
              parseFloat(sgstamt)
            ).toFixed(2);
            FinalTotal += parseFloat(Totalamt);
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.Good.name}</td>
                <td>{item.Good.HsnCode}</td>
                <td>{qty}</td>
                <td>{rate}</td>
                <td>{total}</td>
                <td>
                  {"(" + cgst + "%) "}
                  <br />
                  {cgstamt}
                </td>
                <td>
                  {"(" + sgst + "%) "}
                  <br />
                  {sgstamt}
                </td>
                <td>
                  <b>{Totalamt}</b>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={7}></td>
            <td>Total</td>
            <td>
              <b>{FinalTotal.toFixed(0)}</b>
            </td>
          </tr>
          <tr>
            <td colSpan={9} style={{ padding: 10 }} align="left">
              In Words: <b>{convertAmountToWords(FinalTotal.toFixed(0))}</b>
            </td>
          </tr>
          <tr>
            <td colSpan={9}>Note: This Bill is Generated by the Computer </td>
          </tr>
        </table>
      </Card>
    </div>
  );
};

export default ShowBill;
