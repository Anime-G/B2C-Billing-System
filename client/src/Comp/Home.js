import React from 'react'
import { Carousel } from "antd";

const Home = () => {
  
    const contentStyle = {
      margin: 0,
      height: "350px",
      background: 'linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)'
    };
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
    </div>
  )
}

export default Home
