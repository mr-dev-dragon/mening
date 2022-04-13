import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { devices } from "./devices";
import { Card, Row } from "antd";

export const HeroDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  padding: 5% 10%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;

  @media ${devices.tablet} {
    margin-right: 20px;
  }

  @media ${devices.mobile} {
    margin-bottom: 20px;
  }
`;

export const DivTitle = styled.h1`
  color: #000000;
  padding-top: 3%;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 30vh;
`;

export const Title = styled.h1`
  color: #000000;
  padding-top: 3%;
`;

export const Subtitle = styled.h4`
  color: #222222;
  padding-top: 3%;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  max-width: 500px;
`;

export const PageTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
`;

export const Btn = styled.nav`
  display: flex;
  align-items: center;
`;

export const BtnLink = styled(Link)`
  border-radius: 4px;
  background: #5b25c0;
  padding: 10px 22px;
  margin-top: 15px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #e7d9ff;
    color: #010606;
  }
`;

export const featureDiv = styled.div``;

// Ant-Design

export const Cards = styled(Card)`
  height: 174px;
  margin-top: 10px;

  &:hover {
    transition: all 0.4s ease-in-out;
    background: #e7d9ff;
    color: #010606;
    border-radius: 20px;
  }
`;

export const Line = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
