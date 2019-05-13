import styled from "styled-components";

const Field = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F5F5F5;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  width: 160px;
  height: 160px;
  font-size: 10rem;
  color: #673D9E;
  margin: 5px;
`;

const CellButton = styled.button`
  width: 100%;
  height: auto;
  font-size: 100px;
  color: ${props => props.empty ? '#F5F5F5': '#673D9E'};
  outline: none;
  background: transparent;
  border: none;
`;

const InfoContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

const Text = styled.p`
  font-weight: normal;
  font-size: 36px;
  color: #FFF;
`;

const Mark = styled.span`
  font-weight: 600;
  font-size: 45px;
  color: #FFF;

`;

const PageContainer = styled.div`
  padding: 20px;

`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeaveButton = styled.button`
border-radius: 30px;
border: 2px solid #FFF;
font-weight: 500;
padding: 10px;
font-size: 25px;
  color: #673D9E;

`;

export {
  Field,
  Cell,
  InfoContainer,
  Text,
  Mark,
  PageContainer,
  CellButton,
  Row,
  LeaveButton
};