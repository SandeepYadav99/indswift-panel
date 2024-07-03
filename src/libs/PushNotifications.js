/**
 * Created by charnjeetelectrovese@gmail.com on 2/21/2020.
 */

import {initializeApp} from 'firebase/app';
import {getToken, getMessaging, onMessage, isSupported} from 'firebase/messaging';
import LogUtils from "./LogUtils";
// import {serviceCaptureFcmInformation} from "../services/Common.service";

const firebaseConfig = {
    apiKey: "AIzaSyCW0rRVKNYUCrBX2PHammwCyyFdRAjDlmg",
    authDomain: "skynet-erp.firebaseapp.com",
    projectId: "skynet-erp",
    storageBucket: "skynet-erp.appspot.com",
    messagingSenderId: "131266789479",
    appId: "1:131266789479:web:d55a348ad55b4c7ba554c2",
    measurementId: "G-66J09VX6XX"
};



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
    // try {
    //     if (messaging.isSupported()) {
    //         const messaging = firebase.messaging();
    //         await messaging.requestPermission();
    //         const token = await messaging.getToken();
    //         console.log('token do:', token);
    //         // serviceCaptureFcmInformation({ gcm_id: token, device_os: 'WEB', os_version: 'WEB', app_version: 1, device_id: 'WEB' })
    //         return token;
    //     }
    // } catch (error) {
    //     console.error('error @ askForPermissioToReceiveNotifications', error);
    // }
}

export const getTokenFcm = () => {
    return new Promise(async (res, rej) => {
        const isSupport = await isSupported();
        if (isSupport) {
            const firebaseApp = initializeApp(firebaseConfig);
            const messaging = getMessaging(firebaseApp);
            getToken(messaging, {vapidKey: 'BOgFQDCb65uFZMu704IcZuDl0RvxP6libE_tCRSNyMtOXRSgvc-93VwCzirpGi3TxPpPd4z3oTk9sSLDPR09OXA'}).then((currentToken) => {
                if (currentToken) {
                    LogUtils.log(`current token for client: ${currentToken}`);
                    res(currentToken);
                    // Track the token -> client mapping, by sending to backend server
                    // show on the UI that permission is secured
                } else {
                    LogUtils.log('No registration token available. Request permission to generate one.');
                    res(null);
                    // shows on the UI that permission is required
                }
            }).catch((err) => {
                LogUtils.log(`An error occurred while retrieving token. ${err}`);
                res(null);
                // catch error while creating client token
            });
        } else {
            res(null);
        }
    })
}


export const onMessageListener = () => {
   return new Promise((resolve) => {
       const firebaseApp = initializeApp(firebaseConfig);
       const messaging = getMessaging(firebaseApp);
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
