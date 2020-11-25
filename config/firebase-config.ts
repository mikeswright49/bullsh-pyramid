const STAGING_CONFIG = {
    apiKey: 'AIzaSyA6gqXeUY6kGKbOWn04KakQ_jBDNj9nNHA',
    authDomain: 'bullshi-t-pyramid-staging.firebaseapp.com',
    databaseURL: 'https://bullshi-t-pyramid-staging.firebaseio.com',
    projectId: 'bullshi-t-pyramid-staging',
    storageBucket: 'bullshi-t-pyramid-staging.appspot.com',
    messagingSenderId: '692810786736',
    appId: '1:692810786736:web:8cd9b46177a733fdc7d875',
    measurementId: 'G-CGNXZREQFV',
};

const PROD_CONFIG = {
    apiKey: 'AIzaSyCQvGloOHRR-EhdvQuP2O1s9gBawO-WKKs',
    authDomain: 'bullsh-t-pyramid.firebaseapp.com',
    databaseURL: 'https://bullsh-t-pyramid.firebaseio.com',
    projectId: 'bullsh-t-pyramid',
    storageBucket: 'bullsh-t-pyramid.appspot.com',
    messagingSenderId: '285752960187',
    appId: '1:285752960187:web:64c95e21df1ad0a94d359e',
    measurementId: 'G-LCWS99DCYR',
};

export function getFirebaseConfig(env = 'staging') {
    return env === 'prod' ? PROD_CONFIG : STAGING_CONFIG;
}
