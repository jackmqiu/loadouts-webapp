import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const theme = createTheme({
  spacing: 8,
  shape: {
    borderRadius: 10
  },
  palette: {
    primary: {
      main: '#1b2a4a',
    },
    secondary: {
      main: '#C5C1C1',
    },
    tertiary: {
      main: '#ECEFE9',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="loadoutsdotme.us.auth0.com"
        clientId="qxuaL5WqxG56RH4ZuqhGawu1CITUbrl7"
        redirectUri={window.location.origin}
        audience="https://loadoutsdotme.us.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <Auth0Provider
            domain="loadoutsdotme.us.auth0.com"
            clientId="qxuaL5WqxG56RH4ZuqhGawu1CITUbrl7"
            redirectUri={window.location.origin}
            audience="https://loadoutsdotme.us.auth0.com/api/v2/"
            scope="read:current_user update:current_user_metadata"
          >
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </Auth0Provider>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root'))
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
