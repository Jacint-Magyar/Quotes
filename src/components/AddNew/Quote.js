import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Buttons from './Buttons';

const Quote = () => {
  const quoteRef = useRef();

  const saveQuote = () => {
    const quote = quoteRef.current.value;
    axios.post('http://localhost:5000/quotes/add/quote', { quote })
      .then(res => console.log(res.data));
  }
  return (
    <>
      <Textarea ref={quoteRef} placeholder="Write your quote here..." />
      <Buttons onSave={saveQuote} />
    </>
  );
};

export default Quote;

const Textarea = styled.textarea`
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 50px;
  padding: 24px 32px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #404040;
  width: 100%;
  height: 440px;
  outline: none;
  border: none; 
  font-size: 20px;
  backdrop-filter: blur(4px);

  &::-webkit-input-placeholder {
    font-style: italic;
  }
`
