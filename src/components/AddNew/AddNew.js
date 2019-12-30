import React from 'react';
import { NavLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Quote from './Quote';
import List from './List';

const AddNew = () => {
  const match = useRouteMatch();

  return (
    <Wrapper>

      <SubMenu>
        <NavLink to={`${match.url}/quote`} activeClassName="active">
          Quote
        </NavLink>
        <NavLink to={`${match.url}/list`} activeClassName="active">
          List
        </NavLink>
      </SubMenu>

      <Switch>
        <Route path={`${match.url}/quote`}>
          <Quote />
        </Route>
        <Route path={`${match.url}/list`}>
          <List />
        </Route>
        <Redirect exact from={match.url} to={`${match.url}/quote`} />
      </Switch>

    </Wrapper>
  )
};

export default AddNew;


const Wrapper = styled.div`
  position: relative;
  z-index: 900;
  padding: 0 40px;
  padding-top: 96px;
  margin: 0 auto;
  width: ${props => props.theme.maxWidth};
  height: 100%;
`;

const SubMenu = styled.div`
  margin-bottom: 24px;

  a {
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
`;