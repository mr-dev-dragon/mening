import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Profile, Body, Image } from "../styles/StyledAccount";

import { Card, Avatar, Modal, Button } from "antd";
import {
  PlusOutlined,
  ContainerOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";

const { Meta } = Card;

const Account = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [boardName, setBoardName] = useState([]);
  //Recuperation des boards en DB pour les afficher dans la liste des boards de l'utilisateur
  useEffect(() => {
    var findBoards = async () => {
      var boards = await fetch(`/board/${props.token}`);
      var body = await boards.json();
      console.log(body);
      setBoardName(body.boards); // stockage des infos des boards de l'utilisateur dans l'etat boardName
    };
    findBoards();
  }, []);

  const state = {
    loading: false,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    props.setIsLoggedOut();
  };

  return (
    <Body className="Account-page">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "19%",
        }}
      >
        <div>
          <Profile
            style={{
              width: "200%",
              borderRadius: "2%",
            }}
            actions={[
              // <SettingOutlined key="setting" onClick={showModal2} />,
              <Link to="/create">
                Create a board <PlusOutlined key="create" />
              </Link>,
              <p onClick={showModal}>
                {" "}
                My Boards
                <ContainerOutlined key="board" onClick={showModal} />{" "}
              </p>,

              <Link to="/">
                Logout
                <LogoutOutlined key="logout" onClick={logout} />
              </Link>,
            ]}
          >
            <Modal
              visible={isModalVisible}
              title="Boards"
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
              ]}
            >
              {boardName.map((board, i) => (
                <p key={i} style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ marginRight: "20px" }}>
                    <Link to={`/board/${board._id}`}>{board.boardName}</Link>
                  </p>
                  <p>{board.boardDesc}</p>
                </p>
              ))}
            </Modal>

            <Meta
              avatar={
                <Avatar
                  src={`https://eu.ui-avatars.com/api/?name=${props.user.username}&background=5b25c0&color=fff`}
                />
              }
              title={`${props.user.username}`}
              description="Free Account"
            />
          </Profile>
        </div>
        <Image src={require("../images/profile.svg")} alt="profile" />
      </div>
    </Body>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setIsLoggedOut: function () {
      dispatch({ type: "setIsLoggedOut" });
    },
  };
}
function mapStateToProps(state) {
  return { token: state.token, user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
