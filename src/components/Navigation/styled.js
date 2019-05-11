import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: #FFF;
  font-size: 20px;
  text-decoration: none;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  
  > * {
  margin: 20px;
  }
  ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  }
  li {
    text-align: center;
    display: inline-block;
    margin: 0 40px;
}
`;
const AppLabel = styled.span`
  font-weight: 600;
  font-size: 48px;
  color: #FFFF;
`;

export {
  StyledLink,
  NavBar,
  AppLabel
};