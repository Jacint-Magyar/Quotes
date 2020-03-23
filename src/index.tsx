import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  black: '#333333',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '960px',
  bs: '0px 2px 8px rgba(0, 0, 0, 0.9)',
  bsLight: '0px 1px 4px rgba(0, 0, 0, 0.2)',
  ts: '0px 1px 4px rgba(0, 0, 0, 0.7)',
  bgLight: 'rgba(255, 255, 255, 0.6)',
  bgLighter: 'rgba(255, 255, 255, 0.8)',
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap&subset=latin-ext');
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.4;
    font-family: 'Roboto', sans-serif;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  .highlighted-text {
    background-color: #999999;
  }
`
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
