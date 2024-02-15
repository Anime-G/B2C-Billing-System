import React from "react";
import { Card, Carousel, Col, List, Row } from "antd";
import Meta from "antd/es/card/Meta";
const DispHome = () => {
  const contentStyle = {
    margin: 0,
    height: "350px",
    background:
      "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
  };
  const sw = {
    features: [
      {
        name: "Document Management",
        description:
          "Organize, store, and share documents securely within the software.",
        image_url:
          "https://i.pinimg.com/564x/46/e1/26/46e12615742f97238649740a76c1e93a.jpg",
      },
      {
        name: "Time Tracking",
        description:
          "Track time spent on tasks and projects, and generate reports for billing and analysis.",
        image_url:
          "https://i.pinimg.com/736x/d8/86/d2/d886d2e931b300a99c1e34cf18f04cd1.jpg",
      },
      {
        name: "Integration with Third-Party Apps",
        description:
          "Seamlessly integrate with popular third-party applications and services for enhanced functionality.",
        image_url:
          "https://i.pinimg.com/564x/fd/ac/ec/fdacec582f6b8a355878e8dcd09eb940.jpg",
      },
      {
        name: "Customizable Workflows",
        description:
          "Create and customize workflows to automate repetitive tasks and streamline processes.",
        image_url:
          "https://i.pinimg.com/564x/f9/86/a2/f986a29cf29f185250572c96475c6347.jpg",
      },
      {
        name: "Customer Support Portal",
        description:
          "Provide a dedicated portal for customer support, including ticketing, knowledge base, and FAQs.",
        image_url:
          "https://i.pinimg.com/564x/bf/3a/df/bf3adfe55bbf904070ea2735664cb944.jpg",
      },
      {
        name: "Mobile App",
        description:
          "Access key features of the software on the go with a dedicated mobile application.",
        image_url:
          "https://i.pinimg.com/736x/08/7d/a3/087da372727f3062340c4a139332c007.jpg",
      },
      {
        name: "Data Security",
        description:
          "Ensure data security with encryption, access controls, and regular security audits.",
        image_url:
          "https://i.pinimg.com/736x/50/23/5a/50235a1d8e6e22c9a29c82bef0d9e3fa.jpg",
      },
      {
        name: "Reporting and Analytics",
        description:
          "Generate detailed reports and analytics to gain insights into performance, trends, and user behavior.",
        image_url:
          "https://i.pinimg.com/736x/8f/b1/36/8fb136cb0d50ca9b17c0701b660b3a49.jpg",
      },
      // Add more features as needed
    ],
  };

  const itemsPerSlide = 3; // Number of cards per slide

  const slides = [];
  let data = sw.features;
  for (let i = 0; i < data.length; i += itemsPerSlide) {
    const cardsInSlide = data.slice(i, i + itemsPerSlide).map((card, index) => (
      <Col key={index} span={7} style={{ height: "fit-content" }}>
        <Card
          hoverable
          style={{ marginBottom: 20, height: "350px" }}
          cover={<img alt="example" height={200} src={card.image_url} />}
        >
          <Meta title={card.name} description={card.description} />
        </Card>
      </Col>
    ));
    slides.push(
      <div key={i}>
        <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
          {cardsInSlide}
        </Row>
      </div>
    );
  }
  const companies = [
    {
      name: "TechSolutions Inc.",
      tagline: "Empowering Innovations",
      logo_url: "https://i.pinimg.com/736x/1d/91/05/1d910522b6046c321b096274dfe0ed0c.jpg",
    },
    {
      name: "DataWorks Ltd.",
      tagline: "Unlocking Insights",
      logo_url: "https://i.pinimg.com/736x/fb/4a/14/fb4a14c08d6be2a7577fecbdc2764e49.jpg",
    },
    {
      name: "InnovateHub Technologies",
      tagline: "Driving Digital Transformation",
      logo_url: "https://i.pinimg.com/564x/17/3e/4a/173e4ae4acd61c63318ce0d8935a4f64.jpg",
    },
    {
      name: "NexGen Solutions",
      tagline: "Leading the Future",
      logo_url: "https://i.pinimg.com/564x/e3/f5/4a/e3f54a48ab8b68d391e4cdf45785f578.jpg",
    },
    {
      name: "CodeCrafters Corp.",
      tagline: "Crafting Excellence in Code",
      logo_url: "https://i.pinimg.com/736x/9d/66/18/9d6618334b320dbe8dc0f5a3eaf4734f.jpg",
    },
  ];

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
                <p>
                  In today's fast-paced environment, swift access to assets is
                  crucial for maintaining a competitive edge. Innovative
                  software solutions offer streamlined asset management systems,
                  enabling rapid access, deployment, and utilization. With
                  real-time tracking and efficient workflows, businesses enhance
                  operational agility, minimize downtime, and maximize asset
                  performance. By prioritizing swift access to assets,
                  organizations streamline processes, boost productivity, and
                  drive sustainable growth.
                </p>
              </div>
              <div className="circle">
                <div className="circle-inner"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
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
                <p>
                  Achieving faster growth requires a dynamic approach. By
                  integrating rapid functionality through advanced software
                  solutions, businesses can catalyze expansion like never
                  before. From automated marketing campaigns to real-time
                  analytics, these tools empower teams to seize opportunities
                  swiftly and drive revenue growth. Embracing innovation in
                  operations and customer engagement, organizations unlock new
                  markets, scale operations, and outpace competitors. With rapid
                  growth functionality at their fingertips, businesses cultivate
                  agility, adaptability, and sustained success in today's
                  dynamic business landscape.
                </p>
                <div className="circle">
                  <div className="circle-inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
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
                <p>
                  Strong performance is the cornerstone of success in today's
                  competitive landscape. Through robust software solutions,
                  businesses optimize processes, enhance collaboration, and
                  drive efficiency. By leveraging advanced analytics and
                  real-time insights, organizations gain a comprehensive
                  understanding of performance metrics, enabling informed
                  decision-making and strategic planning. With a focus on strong
                  performance, businesses cultivate a culture of excellence,
                  driving innovation and achieving sustainable growth in dynamic
                  markets.{" "}
                </p>
                <div className="circle">
                  <div className="circle-inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
        <h3 style={contentStyle}>4</h3>
      </div> */}
      </Carousel>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <Card style={{border:"none",color:"white", width: "70%",background:"radial-gradient(circle at 1.8% 4.8%, rgb(17, 23, 58) 0%, rgb(58, 85, 148) 90%)", margin: "20px auto" }}>
          <h1>Rich Features</h1>
          <Carousel effect="fade" autoplay dotPosition="right">
            {slides}
          </Carousel>
        </Card>
            
        <Card style={{ width: "25%", margin: "20px auto",border:"none",color:"white",background:"radial-gradient(circle at 1.8% 4.8%, rgb(17, 23, 58) 0%, rgb(58, 85, 148) 90%)" }}  >
          <h1>Customers</h1><hr/>
          <List
            itemLayout="horizontal"
            dataSource={companies }
            renderItem={(item, index) => (
              <List.Item  key={index} style={{textAlign:"left",margin:"0px auto "}}>
                <List.Item.Meta 
                  

                  title={<span style={{ color: 'white' }}>{item.name}</span>}
                  description={<span style={{ color: 'white' }}>{item.tagline}</span>}
                  
                  avatar={
                    <img src={item.logo_url}  height={50} style={{boxShadow:"0 0 10px white",borderRadius:"50%"}}/>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default DispHome;
