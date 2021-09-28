import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
display: flex;
  color: navyblue;
  text-decoration: none;
  font-weight: bold;
  align-items:flex-start;
  margin-left: 20px;
  line-height: 30px;
  font-size:20px;

  &:hover {
    text-decoration: underline;
  }
`;