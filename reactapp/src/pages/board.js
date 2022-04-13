import React, { useState, useEffect } from "react";
import "../App.css";
import { List, Avatar, Button, Modal } from "antd";
import {
  CaretUpOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  CaretDownOutlined,
  FilterOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import { Btn, BtnLink } from "../styles/StyledContent";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Background from "../images/banner.jpg";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, EmailIcon } from "react-share";

const Board = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Tableau d'idées//
  const [board, setBoard] = useState([]);
  var { id } = useParams();
  //Ne pouvoir voter qu'une fois//
  const [alreadyVoted, setAlreadyVoted] = useState(0);

  // recuperation du board

  useEffect(() => {
    var findBoards = async () => {
      var boards = await fetch(`/myboard/${id}`); // utilisation du param pour retrouver l'id du board
      var body = await boards.json();
      console.log(body.board[0], "LE BODY.board");
      setBoard(body.board[0]);
    };
    findBoards();
  }, []);

  //compteur de vote//
  const like = async (Id) => {
    if (alreadyVoted == 0 || alreadyVoted == -1) {
      var save = await fetch(`/idea-modification/${Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=like&alreadyVoted=${alreadyVoted}`,
      });

      var responseUpdateLike = await save.json();
      setBoard(responseUpdateLike.searchBoardCompteur);
      setAlreadyVoted(alreadyVoted + 1);
    }
  };

  const dislike = async (Id) => {
    if (alreadyVoted == 0 || alreadyVoted == 1) {
      var save = await fetch(`/idea-modification/${Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=dislike&alreadyVoted=${alreadyVoted}`,
      });

      var responseUpdateDisLike = await save.json();
      setBoard(responseUpdateDisLike.searchBoardCompteur);
      if (alreadyVoted === 1) {
        setAlreadyVoted(0);
      } else if (alreadyVoted === 0) {
        setAlreadyVoted(-1);
      }
    }
  };

  // Suppression des idées//

  var deleteIdeaBbdStore = async (ideaId) => {
    const response = await fetch(`/delete-idea/${ideaId}`, {
      method: "DELETE",
    });
    var responseDeleteIdea = await response.json();

    setBoard(responseDeleteIdea.modifyIdeaOnBoard);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //Trie des idées par nombre de vote//
  const sortIdeas = (board) => {
    console.log(board, "test board");
    const NewBoard = { ...board };
    NewBoard.ideaId.sort((a, b) => b.likes - a.likes);
    setBoard(NewBoard);

    console.log(board, "test 2 board");
  };

  return (
    //bannière et photo de profile//
    <div className="Board">
      <div
        style={{
          height: "200px",
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {" "}
        <Link to="/">
          <LeftCircleOutlined
            style={{
              fontSize: "25px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          />
        </Link>
        <img
          src={require("../images/logo.svg")}
          alt="icon"
          style={{
            width: "95px",

            marginLeft: "10rem",
            marginTop: "8%",
          }}
        ></img>
      </div>

      {/* //Titre et Description// */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginLeft: "20%",
            marginTop: "2%",
            marginRight: "20%",
          }}
        >
          <h1 style={{ width: "max-content", fontWeight: "bold" }}>
            {board.boardName}
          </h1>{" "}
        </div>

        {/* Setting et bouton suggérer */}
        <div
          className="icons-list"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20%",
          }}
        >
          <ShareAltOutlined
            style={{
              cursor: "pointer",
              marginTop: "18%",
              marginLeft: "20%",
              fontSize: "20px",
            }}
            onClick={showModal}
          />
          <FilterOutlined
            style={{
              cursor: "pointer",
              marginTop: "18%",
              marginLeft: "20%",
              fontSize: "20px",
            }}
            onClick={() => {
              sortIdeas(board);
            }}
          />
          <Btn
            style={{
              cursor: "pointer",
              marginRight: "10%",
              marginLeft: "10%",
            }}
          >
            <BtnLink to={`/idea-creation/${id}`}>Suggest</BtnLink>
          </Btn>
        </div>
      </div>
      <div>
        <h2
          style={{
            marginLeft: "20%",
            marginRight: "300px",
            fontSize: "15px",
            color: "#343434",
            fontWeight: "lighter",
          }}
        >
          {board.boardDesc}
        </h2>
      </div>

      {/* 


      {/* //liste d'idées et pictos// */}
      {!board.ideaId ? (
        <List></List>
      ) : (
        <List
          itemLayout="horizontal"
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "300px",
            marginTop: "50px",
            marginRight: "300px",
          }}
          dataSource={board.ideaId}
          renderItem={(item) => (
            <List.Item
              key={item.ideaName}
              actions={[
                <Button
                  type="text"
                  icon={<CaretUpOutlined />}
                  size={32}
                  onClick={() => like(item._id)}
                ></Button>,
                <Button
                  type="text"
                  icon={<CaretDownOutlined />}
                  size={32}
                  onClick={() => {
                    dislike(item._id);
                  }}
                ></Button>,
                <p>
                  {" "}
                  {item.likes} likes out of {item.voteCount} voting{" "}
                </p>,
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  size={32}
                  onClick={() => deleteIdeaBbdStore(item._id)}
                ></Button>,
              ]}
            >
              <List.Item.Meta
                author={"Han Solo"}
                avatar={
                  <Avatar
                    src={`https://eu.ui-avatars.com/api/?name=${props.user.username}&background=5b25c0&color=fff`}
                  />
                }
                title={item.ideaName}
                description={item.ideaDesc}
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      )}
      <Modal
        visible={isModalVisible}
        title="Share on:"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div>
          <FacebookShareButton
            url={`https://mening-app.herokuapp.com/board/${id}`}
            quote={"An idea ?"}
            hashtag="#React"
            style={{ marginTop: "5%" }}
          >
            <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://mening-app.herokuapp.com/board/${id}`}
            quote={"An idea ?"}
            hashtag="#React"
            style={{ marginTop: "5%" }}
          >
            <TwitterIcon logoFillColor="white" round={true}></TwitterIcon>
          </TwitterShareButton>
          <EmailShareButton
            url={`https://mening-app.herokuapp.com/board/${id}`}
            quote={"An idea ?"}
            hashtag="#React"
            style={{ marginTop: "5%" }}
          >
            <EmailIcon logoFillColor="white" round={true}></EmailIcon>
          </EmailShareButton>
        </div>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Board);
