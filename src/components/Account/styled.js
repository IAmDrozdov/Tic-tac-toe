import styled from 'styled-components';


const Image = styled.img`
  width: 90%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
`;

const Card = styled.div`
  background: #F5F5F5;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  margin-left: 20px;
  width: 80%;
  min-width: 700px;
  max-width: 900px;
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
width: 60%;
`;

const StatisticsContainer = styled.div`

`;

const Text = styled.p`
  font-weight: ${props => props.main ? "500" : "normal"};
  font-size: ${props => props.main ? "30px" : "24px"}; 
  color: #646464;
  word-wrap: break-word;

`;

const AvatarContainer = styled.div`

`;

const Input = styled.input`
  color: #4D4D4D;
  background: transparent;
  font-size: 15px;
  line-height: 27px;
  font-weight: 300;
  border: none;
  outline: none;
  border-bottom: 1px solid #313131;
  margin-bottom: 40px;
  padding-bottom: 10px;
  margin-right: 10px;
`;
const Button = styled.button`
  background: linear-gradient(90deg, #673D9D 0%, #5055DC 100%);
  border-radius: 11px;
  color: #FFF;
  font-weight: 300;
  font-size: 15px;
  padding: 5px;
  outline: none;
  :active {
    position: relative;
        top: 2px;
    }
    :hover {
    cursor: pointer;
    }
    :disabled{
    opacity: 0.8;
    cursor: default;
    }
`;


const LinkPasswordButton = styled.button`
  border: none;
  background: transparent;
  color: #4D4D4D;
  font-weight: 300;
  font-size: 20px;
  height: 50px;
  outline: none;
  :active {
    position: relative;
        top: 2px;
    }
    :hover {
    cursor: pointer;
    color: #000;
    }
`;

const ErrorText = styled.p`
  color: #FF6B69;
  font-size: 10px;
  width: 80%;

`;

const InputFile = styled.input`
  background: linear-gradient(90deg, #673D9D 0%, #5055DC 100%);
  border-radius: 11px;
  color: #FFF;
  padding: 5px;
  outline: none;
  :hover {
  cursor: pointer;
  }
  width: 80%;
`;

const ChangeAvatarContainer = styled.form`
  width: 90%;

`;
 export {
   Image,
   Card,
   InfoContainer,
   StatisticsContainer,
   Button,
   Text,
   AvatarContainer,
   Input,
   LinkPasswordButton,
   ErrorText,
   InputFile,
   ChangeAvatarContainer
 }