import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SpinLoader from 'components/SpinLoader';
import { Bottom, BottomLink } from 'components/styles/Bottom';

const DailyQuote = () => {
  const [quote, setQuote] = useState({ text: '', isLast: false });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/quotes/${index}`)
      .then(res => setQuote(res.data))
      .catch(err => console.log(err));

    // axios.get('http://localhost:5000/lists')
    //   .then(response => setLists(response.data))
    //   .catch(err => console.log(err));
  }, [index]);

  return (
    <Wrapper>
      {quote.text === '' ?
        <SpinLoader /> :
        <Quote>
          {quote.text}
          {index !== 0 &&
            <img
              src="/assets/prev.svg"
              alt="Left arrow"
              className="arrowLeft"
              onClick={() => setIndex(index - 1)}
            />
          }
          {!quote.isLast &&
            <img
              src="/assets/next.svg"
              alt="Right arrow"
              className="arrowRight"
              onClick={() => setIndex(index + 1)}
            />
          }
        </Quote>
      }
      <BottomWrapper>
        <Bottom>
          <Link to='/library'>
            <BottomLink>
              <img src="/assets/list.svg" alt="List icon" />
              <span>See all quotes</span>
            </BottomLink>
          </Link>
          <Link to='/new'>
            <BottomLink>
              <img src="/assets/plus.svg" alt="Plus icon" />
              <span>Add new</span>
            </BottomLink>
          </Link>
        </Bottom>
      </BottomWrapper>
    </Wrapper>
  )
}

export default DailyQuote;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Quote = styled.div`
  font-size: 3vh;
  color: white;
  text-shadow: ${props => props.theme.bs};
  width: 100%;
  text-align: center;
  font-weight: 300;
  font-style: italic;
  padding: 8px 15vw;
  max-height: calc(100vh - 124px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
  }

  &:hover img {
    opacity: 1;
  }

  img {
    width: 32px;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity .2s ease-in-out;
    cursor: pointer;
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.7));

    &.arrowLeft {
      left: 7vw;
    }
    &.arrowRight {
      right: 7vw;
    }
  }
`;
const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;