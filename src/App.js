import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import { DailyQuote, Library, AddNew, EditQuote, EditList } from 'pages';

const App = () => {

  return (
    <BrowserRouter style={{ minHeight: '100vh' }}>
      <Wrapper>
        <Overlay />
        <Switch>
          <Route exact path='/'>
            <DailyQuote />
          </Route>
          <Route path='/library'>
            <Library />
          </Route>
          <Route path='/new'>
            <AddNew />
          </Route>
          <Route path='/edit-quote'>
            <EditQuote />
          </Route>
          <Route path='/edit-list'>
            <EditList />
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
