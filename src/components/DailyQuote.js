import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import SpinLoader from './SpinLoader';
import { Bottom, BottomLink } from 'components/styles/Bottom';

const DailyQuote = ({ quotes }) => {
  const [index, setIndex] = useState(0)
  let match = useRouteMatch();

  return (
    <>
      <Main>
        {quotes.length === 0 ?
          <SpinLoader /> :
          <Quote>
            {quotes[index].text}
            {index !== 0 &&
              <img
                src="/assets/prev.svg"
                alt="Left arrow"
                className="arrowLeft"
                onClick={() => setIndex(index - 1)}
              />
            }
            {index !== quotes.length - 1 &&
              <img
                src="/assets/next.svg"
                alt="Right arrow"
                className="arrowRight"
                onClick={() => setIndex(index + 1)}
              />
            }
          </Quote>
        }
      </Main>
      <Bottom>
        <Link to={`${match.path}/list`}>
          <BottomLink>
            <img src="/assets/list.svg" alt="List icon" />
            <span>See all quotes</span>
          </BottomLink>
        </Link>
        <Link to={`${match.path}/add`}>
          <BottomLink>
            <img src="/assets/plus.svg" alt="Plus icon" />
            <span>Add quote</span>
          </BottomLink>
        </Link>
      </Bottom>
    </>
  )
}

export default DailyQuote;

const Main = styled.div` 
  flex-grow: 1;
  margin-top: 64px;
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`
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
`
