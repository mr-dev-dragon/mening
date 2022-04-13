import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { HeroDiv } from "../styles/StyledContent";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const { TextArea } = Input;

const BoardCreation = (props) => {
  const [title, setTitle] = useState(""); //enregistrement du titre du board dans le store
  const [desc, setDesc] = useState(""); //enregistrement de la description du board dans le store
  const [boardId, setBoardId] = useState(""); //enregistrement de l'id du board qui vient d'être créée
  const [check, setCheck] = useState(false); //etat permettant de redirect vers /board/boardId à la création du board

  //Creation du board en DB (titre et description)
  var saveBoardInfos = async (title, desc) => {
    var save = await fetch("/board-creation", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `title=${title}&desc=${desc}&token=${props.token}`,
    });
    var response = await save.json();

    setBoardId(response.saveBoard._id);
    console.log(response.saveBoard._id, "tessssst");
    setCheck(true);
  };
  if (check === true) {
    return <Navigate to={`/board/${boardId}`} />;
  }
  return (
    <HeroDiv
      className="Board-creation"
      style={{
        paddingLeft: "400px",
        paddingTop: "150px",
        paddingBottom: "150px",
        backgroundColor: "#F6F6F6",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item name="boardName">
          <h1 style={{ fontSize: "25px" }}>Choose a board name</h1>
          <h4 style={{ color: "grey" }}>You can change it later</h4>
          <Input
            style={{ width: "500px" }}
            name="boardTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="descBoard">
          <h1 style={{ fontSize: "25px" }}>A quick description ?</h1>
          <h4 style={{ color: "grey" }}>Up to 80 charactères</h4>
          <TextArea
            style={{ width: "750px" }}
            name="boardDesc"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Item>

        <Button onClick={() => saveBoardInfos(title, desc)}>
          Create
          {/* <BtnLink to={`/board/${boardId}`}>Create</BtnLink> */}
        </Button>
      </Form>
    </HeroDiv>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(BoardCreation);
