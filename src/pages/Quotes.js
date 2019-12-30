import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import QuoteList from 'components/QuoteList';
import AddNew from 'components/AddNew';
import DailyQuote from 'components/DailyQuote';
import { fetchFakeData } from 'data';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [lists, setLists] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get('http://localhost:5000/quotes')
      .then(response => setQuotes(response.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/lists')
      .then(response => console.log(response))
      .then(response => setLists(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Wrapper>
      <Overlay />
      <Switch>
        <Route exact path={match.path}>
          <DailyQuote quotes={quotes} />
        </Route>
        <Route path={`${match.path}/list`}>
          <QuoteList quotes={quotes} lists={lists} />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddNew />
        </Route>
      </Switch>
    </Wrapper>
  )
}

export default Quotes

const Wrapper = styled.div`
  height: 100vh;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  background: url("https://source.unsplash.com/collection/827743/1600x900");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
  padding-bottom: 20px;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`
