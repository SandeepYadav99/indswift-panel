importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCW0rRVKNYUCrBX2PHammwCyyFdRAjDlmg",
    authDomain: "skynet-erp.firebaseapp.com",
    projectId: "skynet-erp",
    storageBucket: "skynet-erp.appspot.com",
    messagingSenderId: "131266789479",
    appId: "1:131266789479:web:d55a348ad55b4c7ba554c2",
    measurementId: "G-66J09VX6XX"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
