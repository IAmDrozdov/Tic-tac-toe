import styled from "styled-components";

const Text = styled.p`
  font-weight: 500;
  font-size: 100px;  
  color: #FFF;
  width: 50%;
  margin-right: 10px;
`;

const Cell = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  border-top: ${props => props.borderTop ? "10px solid #FFF" : "none"};
  border-bottom: ${props => props.borderBottom ? "10px solid #FFF" : "none"};
  border-left: ${props => props.borderLeft ? "10px solid #FFF" : "none"};
  border-right: ${props => props.borderRight ? "10px solid #FFF" : "none"};
  transform: ${props => props.x && "rotate(45deg)"};
`;

const CellContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .column {
    display         : flex;
    flex-direction  : column;
    justify-content : space-between;
  }
`;

const Container = styled.div`
  display: flex;
  padding: 50px 100px 100px;
  align-items: center;
  justify-content: center;
`;

const X = styled.div`
  background: #FFF;
  height: 100px;
  position: relative;
  width: 20px;
  border-radius: 20px;
  :after {
    background: #FFF;
    content: "";
    height: 20px;
    left: -40px;
    position: absolute;
    top: 40px;
    width: 100px;
    border-radius: 20px;
  }

`;

const O = styled.div`
border-radius: 50%;
border: 20px solid #FFF;
height: 90px;
width: 90px;
`;

export {
  Text,
  Cell,
  Container,
  CellContainer,
  X,
  O
};