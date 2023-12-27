import styled from "styled-components";

export const Button = styled.button`
  padding: 10px 18px;
  border-radius: 5px;
  background: #000;
  color: white;
  min-width: 220px;
  border: border 1px solid transparent;
  font-size: 16px;
  font-weight: 600;
  transition: 0.4s background ease-in;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    transition: 0.4s background ease-in;
  }
`;

export const OutlineButton = styled(Button)`
  background-color: white;
  border: 1px solid black;
  color: black;
  &:hover {
    background-color: black;
    border: 1px solid transparent;
    color: white;
  }
`;
