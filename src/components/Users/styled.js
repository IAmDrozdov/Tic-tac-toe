import { Link } from "react-router-dom";
import styled from "styled-components";

const OnlineBadge = styled.span`
  border-radius: 50%;
  border: ${props => props.size === "large" ? "10px" : "10px"} solid red;
  position: absolute;
  right: -9px;
  bottom: 0;
`;

const ListItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F5F5F5;
  width: 450px;
  height: 150px;
  margin: 5px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  text-decoration: none;
  padding:  0 40px;
  :active {
    position: relative;
    top: 2px;
  }
`;

const ImageContainer = styled.div`
display: inline-block;
    position:relative;

`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width:   ${props => props.avatar ? "40%" : "100px"};
  height:   ${props => props.avatar ? "auto" : "100px"};
  border-radius: 10px;
`;

const Text = styled.span`
  color: #646464;
  font-weight: 600;
  font-size: 40px;
  max-width: 66%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Header = styled.span`
  font-weight: 600;
  font-size: 48px;
  line-height: 59px;
  color: #fFF;

`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const Filter = styled.select`
  color: #FFF;
  background: transparent;
  border: none;
  font-weight: 500;
  font-size: 36px;
  outline: none;
`;

const FilterOption = styled.option`
`;

const Card = styled.div`
  background: #F5F5F5;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  margin-left: 20px;
  width: 60%;
  min-width: 700px;
  height: 60%;
  min-height: 500px;
  display: flex;
  flex-direction: row;
  padding: 50px 20px;
  justify-content: space-around;
  align-items: flex-start;
`;

const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 400px;
`;

const StatisticsContainer = styled.div`

`;

const TextCard = styled.p`
  font-weight: ${props => props.username ? "600" : "normal"};
  font-size: ${props => props.username ? "36px" : "24px"}; 
  color: #646464;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #673D9D 0%, #5055DC 100%);
  border-radius: 11px;
  color: #FFF;
  font-weight: 300;
  font-size: 20px;
  width: 100px;
  height: 50px;
  outline: none;
  :active {
    position: relative;
        top: 2px;
    }
    :hover {
    cursor: pointer;
    }
`;

export {
  OnlineBadge,
  ListItem,
  UserListContainer,
  Image,
  Text,
  Header,
  FilterBar,
  PageContainer,
  Filter,
  FilterOption,
  ImageContainer,
  Card,
  StatisticsContainer,
  TextCard,
  InfoContainer,
  Button
};