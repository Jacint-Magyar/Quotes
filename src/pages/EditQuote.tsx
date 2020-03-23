import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Buttons from 'components/Buttons';
import { Quote, Dispatch } from 'types';

interface Props {
  quote: Quote;
  dispatch: Dispatch;
}

const EditQuote: React.FC<Props> = ({ quote, dispatch }) => {
  const quoteRef = useRef(null);
  const history = useHistory();

  const saveQuote = () => {
    const text = quoteRef.current.value;

    axios.post(`http://localhost:5000/quotes/update/${quote._id}`, { text })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    dispatch({ type: 'UPDATE_QUOTES', payload: [] });
    history.push('/library', { updated: true, tab: 'quotes' });
  }

  return (
    <Wrapper>
      <Title>
        <h2>Edit quote</h2>
      </Title>
      <TextArea
        defaultValue={quote.text}
        ref={quoteRef}
        placeholder="Write your quote here..."
      />
      <Buttons cancelPath='/library' onSave={saveQuote} />
    </Wrapper>
  );
};

export default EditQuote;

const Wrapper = styled.div`
  padding: 40px;
  margin: 0 auto;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  height: 100%;
  z-index: 800;

  @media (max-width: 600px) {
    padding: 20px 16px;
  }
`;
const Title = styled.div`
  margin-bottom: 40px;
  text-align: center;

  h2 {
    display: inline-block;
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0;
    cursor: pointer;
    position: relative;
    text-shadow: ${props => props.theme.ts};
    color: white;

    &:hover {

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: white;
        box-shadow: ${props => props.theme.ts};
      }
    }
  }
`;
const TextArea = styled.textarea`
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
`;
