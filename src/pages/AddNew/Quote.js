import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Buttons from 'components/Buttons';

const Quote = () => {
  const quoteRef = useRef();
  const history = useHistory();

  const saveQuote = () => {
    const quote = quoteRef.current.value;
    axios.post('http://localhost:5000/quotes/new', { quote })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    history.push({ pathname: '/library', state: { updated: true } });
  }
  return (
    <>
      <TextArea ref={quoteRef} placeholder="Write your quote here..." />
      <Buttons onCancel='/' onSave={saveQuote} />
    </>
  );
};

export default Quote;

const TextArea = styled.textarea`
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 32px;
  padding: 24px 32px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #404040;
  width: 100%;
  height: 440px;
  outline: none;
  border: none; 
  font-size: 20px;
  backdrop-filter: blur(4px);

  &::-webkit-input-placeholder {
    font-style: italic;
    color: #4d4d4d;
  }
`;
