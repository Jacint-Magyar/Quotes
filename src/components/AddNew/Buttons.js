import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Buttons = ({ onSave }) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Button1 onClick={() => history.push("/quotes/all")}>
        Cancel
      </Button1>
      <Button2 onClick={() => onSave()}>
        Save
      </Button2>
    </Wrapper>
  );
};

export default Buttons;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 156px;
    border-radius: 4px;
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 16px 0;
    text-align: center;
    margin: 0 16px;
    cursor: pointer;
    transition: background .2s ease-in-out;
    outline: none;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  }
`;
const Button1 = styled.button`
  border: 2px solid rgba(255,255,255,0.9);
  background-color: transparent;
  color: white;

  &:hover {
    background-color: rgba(0,0,0,0.3);
  }
`;
const Button2 = styled.button`
  border: none;
  background-color: rgba(255,255,255,0.9);
  color: #404040;

  &:hover {
    background-color: rgba(230,230,230,0.9)
  }
`;