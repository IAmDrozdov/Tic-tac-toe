import styled from "styled-components";

const Text = styled.p`
font-weight: 500;
font-size: 40px;
line-height: 59px;
text-align: justify;
color: #FFF;
margin-top: 100px;
width: 80%;
`;

const ContentToCenter = styled.div`
display: flex;
align-items: center;
align-content: center;
justify-content: center;
flex-direction: column;
`;

const Button = styled.button`
  margin-top: 50px;
  background: linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%);
  box-shadow: 4px 4px 8px rgba(22, 1, 84, 0.25);
  border-radius: 11px;
  padding: 10px 35px;
  font-weight: 400;
  font-size: 30px;
  line-height: 37px;
  color: #424242;
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
  Text,
  ContentToCenter,
  Button
};
