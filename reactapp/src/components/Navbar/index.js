import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "../../styles/StyledNavbar";

import { connect } from "react-redux";

const Navbar = (props) => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={require("../../images/logo.svg")} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            How does it work ?
          </NavLink>

          {props.isLoggedIn ? (
            <NavLink to="/account" activeStyle>
              Account
            </NavLink>
          ) : (
            <NavLink to="/sign-up" activeStyle>
              Login
            </NavLink>
          )}
        </NavMenu>
        {props.isLoggedIn ? (
          <NavBtn>
            <NavBtnLink to="/create">Create a board</NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/sign-up">Create a board</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToProps, null)(Navbar);
