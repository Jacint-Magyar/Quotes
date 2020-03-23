import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import { DailyQuote, Library, AddNew, EditQuote, EditList } from 'pages';
import { Quote, List } from 'types';

interface State {
  quotes: Quote[];
  selectedQuote: Quote | null;
  lists: List[];
  selectedList: List | null;
}

interface Action {
  type: string;
  payload: any;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_QUOTES':
      return {
        ...state,
        quotes: action.payload
      };
    case 'UPDATE_LISTS':
      return {
        ...state,
        lists: action.payload
      };
    case 'SELECT_QUOTE':
      return {
        ...state,
        selectedQuote: state.quotes.find(quote => quote._id === action.payload)
      };
    case 'SELECT_LIST':
      return {
        ...state,
        selectedList: state.lists.find(list => list._id === action.payload)
      };
    default:
      return state;
  }
}

const initialState: State = { quotes: [], selectedQuote: null, lists: [], selectedList: null };

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <Wrapper>
        <Overlay />
        <Switch>
          <Route exact path='/'>
            <DailyQuote />
          </Route>
          <Route path='/library' render={(props) => <Library
            {...props}
            preLoadedQuotes={state.quotes}
            preLoadedLists={state.lists}
            dispatch={dispatch}
          />} />
          <Route path='/new'>
            <AddNew />
          </Route>
          <Route path='/edit-quote'>
            <EditQuote quote={state.selectedQuote} dispatch={dispatch} />
          </Route>
          <Route path='/edit-list'>
            <EditList list={state.selectedList} dispatch={dispatch} />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  background: url("https://source.unsplash.com/collection/827743/1600x900");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;
