import styled from 'styled-components';

const Form = styled.form`
  background: #F5F5F5;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  height: 65%;
  min-width: 400px;
`;

const Input = styled.input`
  color: #4D4D4D;
  background: transparent;
  font-size: 22px;
  line-height: 27px;
  font-weight: 300;
  border: none;
  outline: none;
  border-bottom: 1px solid #313131;
  margin-bottom: 40px;
  padding-bottom: 10px;
  width: 80%;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #673D9D 0%, #5055DC 100%);
  border-radius: 11px;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 22px;
  line-height: 37px;
  padding: 10px 30px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  outline: none;
  margin-bottom: 20px;

  :disabled {
    opacity: 0.2;
  }
  :hover {
  cursor: pointer;
  }
`;

const ErrorText = styled.p`
  color: #FF6B69;
  font-size: 10px;
  width: 80%;

`;

const Header = styled.h1`
  font-size: 40px;
  font-weight: 600;
  font-style: normal;
  line-height: 59px;
  color: #3A3A3A;
  margin: 40px 0;
`;

const ContentToCenter = styled.div`
display: flex;
align-items: center;
align-content: center;
justify-content: center`;

const Span = styled.span`
color: #4D4D4D;
font-size: ${props => props.fontSize || '18px'};
border-bottom: ${props => props.underline && '1px solid'};
cursor: ${props => props.link && 'pointer'};
font-weight: ${props => props.bold ? '600' : '400'};
`;

const Paragraph = styled.p`
  margin-top: 15px;
  margin-bottom: 30px;
`;

export {
  Form,
  Input,
  Button,
  Header,
  ContentToCenter,
  ErrorText,
  Span,
  Paragraph
};