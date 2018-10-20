

// BASE SETUP ================================================================
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	firebase = require("firebase"),
	firestore = require("firebase/firestore");
var arrayList = require('ArrayList');
var port = process.env.PORT || 6969; 


// firebase setup

const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
var usersRef = db.collection("users");


// CONFIGURE APP

// body parser, to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});


// BASE APP ==================================================================
// MIDDLEWARE 
app.use(morgan('dev'));  // log all requests to the console

// BASE ROUTES 
app.get('/', function(req, res) {
if (!firebase.apps.length) {
    firebase.initializeApp({});
}
	

db.settings({timestampsInSnapshots: true});

const collection = db.collection('users');

const snapshot =  collection.doc('aturing');
var GSON= require('gson');		
snapshot.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
       res.send('Document data:' + JSON.stringify(doc.data()));

      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
 


 


db.collection('users').doc('aturing').set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912
});


	//res.send('welcome to the home page!');
});



// API =======================================================================
var apiRouter = express.Router();  // get an express router

// API MIDDLEWARE ============================================================
apiRouter.use(function(req, res, next) {
	console.log("someone just came to the app");
	// this is where we authenticate users
	next();
});



//START THE SERVER ===========================================================
app.listen(port);
console.log('port: '+ port);

