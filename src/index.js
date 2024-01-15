/* eslint-disable indent */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// // import { logger } from 'redux-logger';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {setAuthorizationToken, setAxiosTimezone} from './libs/set_auth_token.utils';
import store from './store';
import {AUTH_USER} from "./actions/auth_index.action";
import {actionChangeTheme, actionGetAppSettings} from "./actions/AppSettings.action";
import SnackbarUtils from "./libs/SnackbarUtils";

setAxiosTimezone();
if (localStorage.theme && false) {
    store.dispatch(actionChangeTheme(localStorage.theme));
} else {
    store.dispatch(actionChangeTheme('light'));
}
const isKeepLogin = localStorage.keep_login ? JSON.parse(localStorage.keep_login) : false;

if (localStorage.jwt_token) {
    setAuthorizationToken(localStorage.jwt_token);
    store.dispatch({
        type: AUTH_USER,
        payload: { ...(JSON.parse(localStorage.user)), token: localStorage.jwt_token }
    });
    // store.dispatch(actionGetDashboard());
    store.dispatch(actionGetAppSettings());
    // connectToSocket(localStorage.jwt_token);
} else {
    // connectToSocket();
}
ReactDOM.render(
  <Provider store={store}>
    <App />
      <div id={'installPopUp'} className={'installDiv'}>
          <div>
              Add To Home Screen
          </div>
          <button id="install">Add +</button>
      </div>
  </Provider>,
    document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
    let deferredPrompt = null;
    navigator.serviceWorker.addEventListener("message", (message) => {
        /*
        data:
    firebaseMessaging:
    payload:
    collapse_key: "do_not_collapse"
    from: "1015129279552"
    notification:
    body: "dsd"
    title: "Working Good"
         */

        // console.log('messageSend', message);
        SnackbarUtils.info(message?.data?.data?.title, message?.data?.data?.NEXT_SCREEN);
    });
    navigator.serviceWorker.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    });

    window.addEventListener("DOMContentLoaded", async event => {
        if ('BeforeInstallPromptEvent' in window) {
            // showResult("⏳ BeforeInstallPromptEvent supported but not fired yet");
        } else {
            // showResult("❌ BeforeInstallPromptEvent NOT supported");
        }
        document.querySelector("#install").addEventListener("click", installApp);
    });

    if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
        window.addEventListener('load', () => {
            // Wait for the beforeinstallprompt event
            window.addEventListener('beforeinstallprompt', (event) => {
                // Prevent the default "Add to Home Screen" prompt
                event.preventDefault();
                // Automatically show the "Add to Home Screen" prompt on page load
                // event.prompt();
                if (!deferredPrompt) {
                    document.querySelector("#installPopUp").style.display = "flex";
                }
                deferredPrompt = event;
                // Show your customized install prompt for your PWA
            });
        });
    }

    async function installApp() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            // Find out whether the user confirmed the installation or not
            const { outcome } = await deferredPrompt.userChoice;
            // The deferredPrompt can only be used once.
            // deferredPrompt = null;
            // Act on the user's choice
            if (outcome === 'accepted') {
                // alert('accepted');
            } else if (outcome === 'dismissed') {
                // alert('dismissed');
            }
            // We hide the install button
            document.querySelector("#installPopUp").style.display= 'none';

        }
    }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
