import React, { useContext, useEffect, useState } from 'react'
import { Card, Carousel } from "antd";
import { AuthContext } from '../Helper/AuthContext';
import axios from 'axios';
import { FormsEditNavkey, ProfileNavKey, ServerApi } from './Consts';
import { Link } from 'react-router-dom';

const Home = () => {
  const {user}=useContext(AuthContext);
  const [formlist, setformslist] = useState([]);
  const [form, setforms] = useState(null);
  const getformsList = async (id) => {
    //fetch getforms
    const data = await axios.get(ServerApi + "/Forms/" + id);
    if (data) {
      setformslist(data.data);
    }
  };
    const contentStyle = {
      margin: 0,
      height: "350px",
      background: 'linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)'
    };
    useEffect(()=>{
      getformsList(user.id)
    },[])
  return (
    <div>
      <Carousel style={{ border: "10px black" }} autoplay="true">
        <div>
          <div style={contentStyle} className="container">
            <div className="row">
              <div className="image">
                <img
                  src="https://i.pinimg.com/564x/97/f3/71/97f37197650d9a97cbe566d1a34d6984.jpg"
                  alt="Your Image"
                />
              </div>
              <div className="text-card">
                {/* Your text content goes here */}
                <h2>Faster Access To Your Assets</h2>
                <p>In today's fast-paced environment, swift access to assets is crucial for maintaining a competitive edge. Innovative software solutions offer streamlined asset management systems, enabling rapid access, deployment, and utilization. With real-time tracking and efficient workflows, businesses enhance operational agility, minimize downtime, and maximize asset performance. By prioritizing swift access to assets, organizations streamline processes, boost productivity, and drive sustainable growth.</p>
              </div>
              <div className="circle"><div className="circle-inner"></div></div>
            </div>
          </div>
        </div>
        <div >
          <div style={contentStyle} className="container">
            <div className="row">
              <div className="image">
                <img
                  src="https://i.pinimg.com/564x/90/35/fc/9035fc4cc83ae44ae9d68975526cf1c1.jpg"
                  alt="Your Image"
                />
              </div>
              <div className="text-card">
                {/* Your text content goes here */}
                <h2>Supercharge Growth</h2>
                <p>Achieving faster growth requires a dynamic approach. By integrating rapid functionality through advanced software solutions, businesses can catalyze expansion like never before. From automated marketing campaigns to real-time analytics, these tools empower teams to seize opportunities swiftly and drive revenue growth. Embracing innovation in operations and customer engagement, organizations unlock new markets, scale operations, and outpace competitors. With rapid growth functionality at their fingertips, businesses cultivate agility, adaptability, and sustained success in today's dynamic business landscape.</p>
                              <div className="circle"><div className="circle-inner"></div></div>

              </div>
            </div>
          </div>
        </div>
        <div >
          <div style={contentStyle} className="container">
            <div className="row">
              <div className="image">
                <img
                  src="https://i.pinimg.com/564x/e8/30/80/e8308009403e57f5804ae58700602a51.jpg"
                  alt="Your Image"
                />
                
              </div>
              <div className="text-card">
                {/* Your text content goes here */}
                <h2>Strong Performance</h2>
                <p>Strong performance is the cornerstone of success in today's competitive landscape. Through robust software solutions, businesses optimize processes, enhance collaboration, and drive efficiency. By leveraging advanced analytics and real-time insights, organizations gain a comprehensive understanding of performance metrics, enabling informed decision-making and strategic planning. With a focus on strong performance, businesses cultivate a culture of excellence, driving innovation and achieving sustainable growth in dynamic markets.  </p>
                <div className="circle"><div className="circle-inner"></div></div>

              </div>
            </div>
          </div>
        </div>
        
      </Carousel>
      <Link to={"/"+ProfileNavKey} ><h1>Form</h1></Link>
      <div style={{display:'flex',margin:"20px",background:"none",padding:20, gap:20}}> 
      
        {formlist.length!=0 &&
        (<>
        {formlist.map(form=>{
          return <Link key={form.id} to={"/"+FormsEditNavkey+"/"+form.id} ><Card hoverable="true" style={{width:250}} >
               <img draggable="false" src={form.logo} height={100}  />
               <div> {form.name}
               </div>
          </Card></Link>
        })}</>)}
      </div>
    </div>
  )
}

export default Home
