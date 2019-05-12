import styled from 'styled-components';


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

export {
  Input,
  Button,
  ErrorText
}