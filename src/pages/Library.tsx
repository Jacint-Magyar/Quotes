import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import axios from 'axios';
import styled from 'styled-components';
import { Bottom, BottomLink } from 'components/styles/Bottom';
import { IconEdit, IconDelete } from 'components/Icons';
import { Quote, List, Dispatch } from 'types';
// import SpinLoader from 'components/SpinLoader';

interface RouteStateProps {
  tab: string;
  // updated: boolean;
}

// !TODO: understand this line
interface Props extends RouteComponentProps<{}, any, RouteStateProps | any> {
  preLoadedQuotes: Quote[];
  preLoadedLists: List[];
  dispatch: Dispatch;
}

interface State {
  tab: string;
  quotes: Quote[];
  lists: List[];
  searchTerm: string;
}

class Library extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tab: (this.props.location.state && this.props.location.state.tab) || 'quotes',
      quotes: this.props.preLoadedQuotes,
      lists: this.props.preLoadedLists,
      searchTerm: ''
    }
  }

  componentDidMount() {
    if (this.props.preLoadedQuotes.length === 0) {
      this.fetchQuotes();
    }
    if (this.props.preLoadedLists.length === 0) {
      this.fetchLists();
    }
  }

  // componentDidUpdate(prevProps: Props) {
  //   const updated: boolean = (this.props.location.state && this.props.location.state.updated);
  //   const prevUpdated = (prevProps.location.state && prevProps.location.state.updated);
  //   const { tab } = this.state;

  //   if (prevUpdated !== updated && tab === 'quotes') {
  //     this.fetchQuotes();
  //   }
  //   if (prevUpdated !== updated && tab === 'lists') {
  //     this.fetchLists();
  //   }
  // }

  fetchQuotes = () => {
    axios.get('http://localhost:5000/quotes')
      .then(res => {
        this.setState({ quotes: res.data });
        this.props.dispatch({ type: 'UPDATE_QUOTES', payload: res.data })
      })
      .catch(err => console.log(err));
  }

  fetchLists = () => {
    axios.get('http://localhost:5000/lists')
      .then(res => {
        this.setState({ lists: res.data });
        this.props.dispatch({ type: 'UPDATE_LISTS', payload: res.data })
      })
      .catch(err => console.log(err));
  }

  sanitzeWord = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  filterQuote = (quote: Quote) => {
    return quote.text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .includes(this.state.searchTerm)
  }

  filterList = (list: List) => {
    const titleCondition = list.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .includes(this.state.searchTerm);

    let itemsCondition = false;

    list.items.forEach(item => {
      if (item
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .includes(this.state.searchTerm)) {
        itemsCondition = true;
      }

    });

    return titleCondition || itemsCondition;
  }

  deleteQuote = (id: string) => {
    axios.delete(`http://localhost:5000/quotes/${id}`)
      .then(res => console.log(res.data))
  }

  deleteList = (id: string) => {
    axios.delete(`http://localhost:5000/lists/${id}`)
      .then(res => console.log(res.data))
  }

  editQuote = (id: string) => {
    this.props.dispatch({ type: 'SELECT_QUOTE', payload: id });
    this.props.history.push('/edit-quote');
  }

  editList = (id: string) => {
    this.props.dispatch({ type: 'SELECT_LIST', payload: id });
    this.props.history.push('/edit-list');
  }

  render() {
    const { quotes, lists, tab, searchTerm } = this.state;

    return (
      <Wrapper>
        <TopBar>
          <Categories>
            <span
              onClick={() => this.setState({ tab: 'quotes' })}
              className={tab === 'quotes' ? 'active' : ''}
            >
              Quotes
            </span>
            <span
              onClick={() => this.setState({ tab: 'lists' })}
              className={tab === 'lists' ? 'active' : ''}
            >
              Lists
            </span>
          </Categories>
          <SearchBox>
            <input type="text" placeholder="Search" onChange={(e) => this.setState({ searchTerm: e.target.value })} />
            <img src="/assets/search.svg" alt="Search icon" />
          </SearchBox>
        </TopBar>
        {tab === 'quotes' ?
          <UnorderedList>
            {quotes.filter(this.filterQuote).map(quote =>
              <li key={quote._id}>
                <Highlighter
                  highlightClassName="highlighted-text"
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={quote.text}
                  sanitize={this.sanitzeWord}
                />
                <Actions>
                  <IconEdit onClick={() => this.editQuote(quote._id)} />
                  <IconDelete onClick={() => this.deleteQuote(quote._id)} />
                </Actions>
              </li>
            )}
          </UnorderedList> :
          <UnorderedList>
            {lists.filter(this.filterList).map(list =>
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
                    sanitize={this.sanitzeWord}
                  />
                </h3>
                {list.items.map((item, i) =>
                  <p key={i} style={{ marginBottom: 8, paddingLeft: 8 }}>
                    <Highlighter
                      highlightClassName='highlighted-text'
                      searchWords={[searchTerm]}
                      autoEscape={true}
                      textToHighlight={item}
                      sanitize={this.sanitzeWord}
                    />
                  </p>
                )}
                <Actions>
                  <IconEdit onClick={() => this.editList(list._id)} />
                  <IconDelete onClick={() => this.deleteList(list._id)} />
                </Actions>
              </li>
            )}
          </UnorderedList>
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
  }
}

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
const UnorderedList = styled.ul`
  flex: 1;
  padding: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin: 0 0 24px;
  overflow-y: scroll;
  backdrop-filter: blur(4px);

  &::-webkit-scrollbar {
    display: none;
  }

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