import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import { Bottom, BottomLink } from './styles/Bottom';
import styled from 'styled-components';

const QuoteList = ({ quotes, lists }) => {
  const [selected, setSelected] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const sanitzeWord = text => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  const filterText = quote => {
    return quote.text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .includes(searchTerm)
  }

  return (
    <Wrapper>
      <TopBar>
        <Categories>
          <span
            onClick={() => setSelected(0)}
            className={selected === 0 ? 'active' : ''}
          >
            Quotes
          </span>
          <span
            onClick={() => setSelected(1)}
            className={selected === 1 ? 'active' : ''}
          >
            Lists
          </span>
        </Categories>
        <SearchBox>
          <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
          <img src="/assets/search.svg" alt="Search icon" />
        </SearchBox>
      </TopBar>
      {
        selected === 0 ?
          <List>
            {quotes.filter(filterText).map(quote =>
              <li key={quote._id}>
                <Highlighter
                  highlightClassName="highlighted-text"
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={quote.text}
                  sanitize={sanitzeWord}
                />
              </li>
            )}
          </List> :
          <List>
            {lists.filter(filterText).map((item, index) =>
              <li key={index}>
                <Highlighter highlightClassName='highlighted-text' searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={item}
                  sanitize={sanitzeWord}
                />
              </li>
            )}
          </List>
      }
      <Bottom>
        <Link to='/'>
          <BottomLink>
            <img src="/assets/back.svg" alt="Back arrow icon" />
            <span>Go back home</span>
          </BottomLink>
        </Link>
        <Link to='/add/quote'>
          <BottomLink>
            <img src="/assets/plus.svg" alt="Plus icon" />
            <span>Add quote</span>
          </BottomLink>
        </Link>
      </Bottom>
    </Wrapper>
  )
}

export default QuoteList


const Wrapper = styled.div`
  position: relative;
  z-index: 900;
  padding: 0 40px;
  padding-top: 96px;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
`
const TopBar = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Categories = styled.div`
  span {
    font-size: 20px;
    line-height: 30px;
    margin-right: 40px;
    cursor: pointer;
    position: relative;
    text-shadow: ${props => props.theme.ts};
    color: white;

    &.active {

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
`
const SearchBox = styled.div`
  position: relative;

  input {
    width: 200px;
    background-color: transparent !important;
    border: none;
    font-size: 20px;
    color: #fff;
    padding-right: 24px;

    &:focus {
      outline-width: 0;
    }
    &::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.8);
      font-style: italic;
      font-size: 20px;
    }
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
    backdrop-filter: blur(4px);
  }
  img {
    width: 20px;
    position: absolute;
    right: 0;
    top: 2px;
  }
`
const List = styled.ul`
  flex: 2;
  padding: 0;
  /* border-radius: 8px; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin: 0 0 40px;
  overflow-y: scroll;
  backdrop-filter: blur(4px);

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    padding: 10px 16px;
    color: #404040;
    list-style: none;
    line-height: 1.4;

    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.8)
    }

    &:nth-child(odd) {
      background-color: rgba(255, 255, 255, 0.95)
    }

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`