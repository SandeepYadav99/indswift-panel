/**
 * Created by charnjeetelectrovese@gmail.com on 2/21/2020.
 */

import firebase, {initializeApp} from 'firebase/app';
import {getToken, getMessaging, onMessage} from 'firebase/messaging';
// import {serviceCaptureFcmInformation} from "../services/Common.service";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBt96a6qVAq_TRaXx-ckdac8aVLoNZXwDQ",
    authDomain: "getatour-308ae.firebaseapp.com",
    databaseURL: "https://getatour-308ae.firebaseio.com",
    projectId: "getatour-308ae",
    storageBucket: "getatour-308ae.appspot.com",
    messagingSenderId: "1015129279552",
    appId: "1:1015129279552:web:807a6cf546a6ae2978e3a5",
    measurementId: "G-8XH7MBF1C5"
});
const messaging = getMessaging(firebaseApp);

export const initializeFirebase = () => {
    if ('serviceWorker' in navigator)  {


        // messaging.onMessage((payload) => {
        //     console.log('Message received. ', payload);
        //     // [START_EXCLUDE]
        //     // Update the UI to include the received message.
        //     // [END_EXCLUDE]
        // });
    }
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', async () => {
//             const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//                 updateViaCache: 'none'
//             });
//             messaging.useServiceWorker(registration);
//             messaging.onMessage((payload) => {
//                 const title = payload.notification.title;
//                 const options = {
//                     body: payload.notification.body,
//                     icon: payload.notification.icon,
//                     actions: [
//                         {
//                             action: payload.fcmOptions.link,
//                             title: 'Book Appointment'
//                         }
//                     ]
//                 };
//                 registration.showNotification(title, options);
//             });
//         });
//     }
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        if (firebase.messaging.isSupported()) {
            const messaging = firebase.messaging();
            await messaging.requestPermission();
            const token = await messaging.getToken();
            console.log('token do:', token);
            // serviceCaptureFcmInformation({ gcm_id: token, device_os: 'WEB', os_version: 'WEB', app_version: 1, device_id: 'WEB' })
            return token;
        }
    } catch (error) {
        console.error('error @ askForPermissioToReceiveNotifications', error);
    }
}

export const getToken = () => {
    return getToken(messaging, {vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}


export const onMessageListener = () => {
   return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
