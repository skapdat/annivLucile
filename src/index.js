import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyCnSXx-JnSSwZfNnOtNfekdZGdeHDrqOGI",
    authDomain: "annivlucile-d68a4.firebaseapp.com",
    databaseURL: "https://annivlucile-d68a4.firebaseio.com",
    projectId: "annivlucile-d68a4",
    storageBucket: "annivlucile-d68a4.appspot.com",
    messagingSenderId: "127519580731",
    appId: "1:127519580731:web:1b9ecf3a1c7e2e56ec321e"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
