// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyAJnre6_fL28NPahfRn2KkL__tWjdyVG3E",
    authDomain: "clientsrepo.firebaseapp.com",
    databaseURL: "https://clientsrepo.firebaseio.com",
    projectId: "clientsrepo",
    storageBucket: "clientsrepo.appspot.com",
    messagingSenderId: "139347022064"
  }
};
