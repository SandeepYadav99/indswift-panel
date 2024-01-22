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
    const notificationTitle = payload.data.title;
    const notificationOptions = { body: payload.data.body, data: payload.data };
    console.log('payload', payload.data);
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("push", function(event) {
//     var title = event.data.json().notification.title;
//     var body = event.data.json().notification.body;
//     var icon = "/assets/img/logo.png";
//     var click_action =
//         "http://localhost:4200/#/jobs/notification/" +
//         event.data.json().data.job_no;
//     event.waitUntil(
//         self.registration.showNotification(title, {
//             body: body,
//             icon: icon,
//             data: {
//                 click_action
//             }
//         })
//     );
// });

self.addEventListener('notificationclick', function(event) {
    console.log('called notificationclick');
    var redirect_url = event.notification.data.NEXT_SCREEN;
    event.notification.close();
    event.waitUntil(clients.matchAll({
                type: "window",
                includeUncontrolled: true,
            }).then(function(clientList) {
                console.log('clientList', clientList);
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if ("focus" in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(redirect_url);
                }
            })
    );
});
