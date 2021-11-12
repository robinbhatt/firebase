// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators :true,
  firebase: {
  apiKey: "AIzaSyBKNbdrHjkIrHaMT4AETYhBmojHC-sEdyU",
  authDomain: "angularfirebasechatapp-9fb97.firebaseapp.com",
  databaseURL: "https://angularfirebasechatapp-9fb97-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "angularfirebasechatapp-9fb97",
  storageBucket: "angularfirebasechatapp-9fb97.appspot.com",
  messagingSenderId: "1017876092892",
  appId: "1:1017876092892:web:64f25d64b6d395a99fe119"
  },
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
