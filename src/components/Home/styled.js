import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
    border-radius: 38px;
    width: 350px;
    height: 500px;
    justify-content: space-around;
    align-items: center;
    margin: 0 15px;

`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  background: linear-gradient(90deg, #673D9D 0%, #5055DC 100%);
  border-radius: 11px;
  color: #FFF;
  padding: 10px;
  text-align: center;
  width: 100px;
  :active {
  position: relative;
      top: 2px;
  }
`;

const ContentToCenter = styled.div`
display: flex;
align-items: center;
align-content: center;
justify-content: center`;

const Image = styled.img`
margin-bottom: -100px;
`;

export {
  Card,
  StyledLink,
  ContentToCenter,
  Image
};