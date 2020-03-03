import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import axios from 'axios';
import styled from 'styled-components';
import { Bottom, BottomLink } from 'components/styles/Bottom';
import { IconEdit, IconDelete } from 'components/Icons';
// import SpinLoader from 'components/SpinLoader';

const Library = () => {
  const [quotes, setQuotes] = useState([]);
  const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();
  // const location = useLocation();

  // const updated = location.state && location.state.updated;

  useEffect(() => {
    if (selected === 0) {
      axios.get('http://localhost:5000/quotes')
        .then(res => setQuotes(res.data))
        .catch(err => console.log(err));
    } else {
      axios.get('http://localhost:5000/lists')
        .then(res => setLists(res.data))
        .catch(err => console.log(err));
    }
  }, [selected]);

  const sanitzeWord = text => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  const filterQuote = quote => {
    return quote.text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .includes(searchTerm)
  }

  const filterList = list => {
    const titleCondition = list.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .includes(searchTerm);

    let itemsCondition = false;

    list.items.forEach(item => {
      if (item
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchTerm)) {
        itemsCondition = true;
      }

    });

    return titleCondition || itemsCondition;
  }

  const deleteQuote = id => {
    axios.delete(`http://localhost:5000/quotes/${id}`)
      .then(res => console.log(res.data))
  }

  const deleteList = id => {
    axios.delete(`http://localhost:5000/lists/${id}`)
      .then(res => console.log(res.data))
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
      {selected === 0 ?
        <List>
          {quotes.filter(filterQuote).map(quote =>
            <li key={quote._id}>
              <Highlighter
                highlightClassName="highlighted-text"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={quote.text}
                sanitize={sanitzeWord}
              />
              <Actions>
                <IconEdit
                  onClick={() => history.push({ pathname: '/edit-quote', state: { quote } })}
                />
                <IconDelete onClick={() => deleteQuote(quote._id)} />
              </Actions>
            </li>
          )}
        </List> :
        <List>
          {lists.filter(filterList).map(list =>
            <li key={list._id}>
              {/* <Highlighter
                highlightClassName='highlighted-text'
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={list.text}
                sanitize={sanitzeWord}
              /> */}
              <h3 style={{ marginBottom: 12 }}>
                <Highlighter
                  highlightClassName='highlighted-text'
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={list.title}
                  sanitize={sanitzeWord}
                />
              </h3>
              {list.items.map((item, i) =>
                <p key={i} style={{ marginBottom: 8, paddingLeft: 8 }}>
                  <Highlighter
                    highlightClassName='highlighted-text'
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={item}
                    sanitize={sanitzeWord}
                  />
                </p>
              )}
              <Actions>
                <IconEdit
                  onClick={() => history.push({ pathname: '/edit-list', state: { list } })}
                />
                <IconDelete onClick={() => deleteList(list._id)} />
              </Actions>
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
        <Link to='/new'>
          <BottomLink>
            <img src="/assets/plus.svg" alt="Plus icon" />
            <span>Add new</span>
          </BottomLink>
        </Link>
      </Bottom>
    </Wrapper>
  );
};

export default Library;

const Wrapper = styled.div`
  height: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 32px 16px 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const TopBar = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Categories = styled.div`
  span {
    font-size: 22px;
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
`;
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
  }
  img {
    width: 20px;
    position: absolute;
    right: 0;
    top: 2px;
  }
`;
const List = styled.ul`
  flex: 1;
  padding: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin: 0 0 24px;
  overflow-y: scroll;
  backdrop-filter: blur(4px);

  /* &::-webkit-scrollbar {
    display: none;
  } */

  li {
    padding: 10px 16px;
    padding-right: 72px;
    color: #404040;
    list-style: none;
    line-height: 1.4;
    position: relative;

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

    &:hover {
      div {
        display: flex;
      }
    }
  }
`;
const Actions = styled.div`
  display: none;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;

  & svg {
    width: 36px;
    height: 36px;
    padding: 8px;
    cursor: pointer;

    &:hover {
      fill: #595959;
    }
  }
`;