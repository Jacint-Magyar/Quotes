import React, { Component } from 'react'
// const { YoutubeDataAPI } = require("youtube-v3-api")
// import { gapi, loadAuth2 } from 'gapi-script';
const API_KEY = 'AIzaSyB9T5kQrzUQdukQvqQI-0CS0Xd8s9h5s2M';

// console.log(YoutubeDataAPI)

// const api = new YoutubeDataAPI(API_KEY);

export default class Videos extends Component {

  componentDidMount() {
    // window.addEventListener('load', () => {
    //   console.log(window)
    //   window.gapi.load("client:auth2", function () {
    //     window.gapi.auth2.init({ client_id: '16066200897-5bvu3k7gdgfugodqp864r478fqg0krj8.apps.googleusercontent.com' });
    //   });
    // })

    // 2. Initialize the JavaScript client library.
    //   const start = () => {
    //     gapi.client.init({
    //       'apiKey': API_KEY,
    //       // clientId and scope are optional if auth is not required.
    //       'clientId': '16066200897-5bvu3k7gdgfugodqp864r478fqg0krj8.apps.googleusercontent.com',
    //       'scope': 'https://www.googleapis.com/auth/youtube',
    //     }).then(function () {
    //       // 3. Initialize and make the API request.
    //       return gapi.client.request({
    //         'path': 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
    //       })
    //     }).then(function (response) {
    //       console.log(response.result);
    //     }, function (reason) {
    //       console.log('Error: ' + reason.result.error.message);
    //     });
    //   }
    //gapi.load('client', start);
    const script = document.getElementById('googleScript')

    document.addEventListener('DOMContentLoaded', () => {
      console.log(window)
      this.loadYoutubeApi();
      window.gapi.load('client', this.loadYoutubeApi());
    })
  }

  // authenticate() {
  //   return window.gapi.auth2.getAuthInstance()
  //     .signIn({ scope: "https://www.googleapis.com/auth/youtube" })
  //     .then(function () { console.log("Sign-in successful"); },
  //       function (err) { console.error("Error signing in", err); });
  // }
  // loadClient() {
  //   window.gapi.client.setApiKey('AIzaSyB9T5kQrzUQdukQvqQI-0CS0Xd8s9h5s2M');
  //   return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
  //     .then(function () { console.log("GAPI client loaded for API"); },
  //       function (err) { console.error("Error loading GAPI client for API", err); });
  // }
  // // Make sure the client is loaded and sign-in is complete before calling this method.
  // execute() {
  //   console.log('Youtube API', gapi.client.youtube);

  //   return window.gapi.client.youtube.playlists.list({
  //     "part": "snippet",
  //     "mine": true
  //   })
  //     .then(function (response) {
  //       // Handle the results here (response.result has the parsed body).
  //       console.log("Response", response);
  //     },
  //       function (err) { console.error("Execute error", err); });
  // }

  loadYoutubeApi() {
    window.gapi.client.init()({
      'apiKey': API_KEY,
      'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
      'clientId': '16066200897-5bvu3k7gdgfugodqp864r478fqg0krj8.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/youtube',
    }).then(function () {
      return window.gapi.client.request({
        'path': 'https://www.googleapis.com/youtube/v3/playlists',
        'method': 'GET',
        'params': { 'part': 'snippet', 'mine': 'true' },
        'headers': {
          'Authorization': `Bearer + ${this.props.token}`
        }
      })
    }).then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div style={{ paddingTop: 64 }}>
        Jacint Magyar's playlists: Zene
      </div>
    )
  }
}