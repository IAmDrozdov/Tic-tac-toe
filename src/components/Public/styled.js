import { Link } from "react-router-dom";
import styled from "styled-components";

const ItemInfoContainer = styled.div`
   display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F5F5F5;
  margin: 5px;
  box-shadow: 5px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  text-decoration: none;
  padding: 10px;
  :active {
    position: relative;
    top: 2px;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const PublishButton = styled.button`
  outline: none;
  font-size: 30px;
  border-radius: 11px;
  box-shadow: 4px 4px 8px rgba(22, 1, 84, 0.25);
  padding: 10px;
  :active {
    position: relative;
    top: 2px;
}
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const RespondButton = styled.button`
background: rgba(22, 1, 84, 0.25);
border: none;
border-radius: 30px;
padding: 5px;
margin-left: 10px;
outline: none;
font-size: 20px;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: #000;
font-size: 25px;

`;

export {
  ItemInfoContainer,
  ItemsContainer,
  PublishButton,
  PageContainer,
  RespondButton,
  StyledLink
};