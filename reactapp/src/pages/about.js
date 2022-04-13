import React from "react";
import Navbar from "../components/Navbar";
import { Row, Col } from "antd";

const About = () => {
  return (
    <>
      <div className="Index-page">
        <Navbar style={{ height: "10%" }} />
        <div className="howItWorks-page" style={{ height: "90%" }}>
          <div className="howItWorksTitle">
            <h1>How does it work ?</h1>
          </div>

          <Row
            gutter={[24, 16]}
            style={{
              paddingLeft: "100px",
              paddingRight: "100px",
            }}
          >
            <Col
              style={{
                marginBottom: "50px",
                paddingRight: "100px",
                paddingLeft: "75px",
              }}
              span={12}
            >
              {" "}
              <h1>1. Create feedback boards </h1>{" "}
              <span>
                Create as many boards as you want to collect customer feedback,
                such as 'feature requests' or 'bug reports'. First choose a
                board name, and then a quick description where you can ask the
                question you want feedbacks from you community about.
              </span>{" "}
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "50px",
              }}
              span={12}
            >
              {" "}
              <img
                alt="Create feedback boards"
                style={{
                  justifyContent: "center",
                  borderWidth: 5,
                  alignItems: "center",
                  marginBottom: "50px",
                }}
                width="600px"
                src={require("../images/boardCreation.png")}
              ></img>
            </Col>

            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "50px",
              }}
              span={12}
            >
              <img
                alt="Serve your boards seamlessly"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "50px",
                }}
                width="600px"
                src={require("../images/board.png")}
              ></img>
            </Col>
            <Col
              span={12}
              style={{ marginBottom: "50px", paddingRight: "50px" }}
            >
              {" "}
              <h1>2. Serve your boards seamlessly</h1>{" "}
              <span>
                Implement your own brand identity and share the boards, publicly
                or privately, for your community to share ideas with you. You
                can do it via different channels like Facebook or Twitter...
              </span>{" "}
            </Col>

            <Col
              span={12}
              style={{
                marginBottom: "50px",
                paddingRight: "100px",
                paddingLeft: "75px",
              }}
            >
              {" "}
              <h1>3. Collect feedbacks</h1>{" "}
              <span>
                Collect feedbacks from your community thanks to a vote counter.
                You can also sort the ideas by the number of vote, from the
                largest to the smallest.
              </span>{" "}
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              span={12}
            >
              <img
                alt="Collect feedbacks"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width="600px"
                src={require("../images/like.png")}
              ></img>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default About;
