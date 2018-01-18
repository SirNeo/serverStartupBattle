const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vue-con-auth.firebaseio.com' 
});
  
app.get('/api/battles/public', (req, res) => {
    let publicBattles = [
    {
      id: 1111,
      name: 'Startup NYC',
      sponsor: 'Alec Pesola',
      seedFund: '500k'
    },
    {
      id: 1112,
      name: 'Startup Ontario',
      sponsor: 'Ryan Chenkie',
      seedFund: '750k'
    },
    {
      id: 1113,
      name: 'Startup Uttah',
      sponsor: 'Diego Poza',
      seedFund: '550k'
    },
    {
      id: 1114,
      name: 'Startup Australia',
      sponsor: 'Eugene Kogan',
      seedFund: '500k'
    },
    {
      id: 1115,
      name: 'Startup Buenos Aires',
      sponsor: 'Sebastian Peyrott',
      seedFund: '600k'
    },
    {
      id: 1116,
      name: 'Startup Lagos',
      sponsor: 'Prosper Otemuyiwa',
      seedFund: '650k'
    },
    {
      id: 1117,
      name: 'Startup Oslo',
      sponsor: 'Mark Fish',
      seedFund: '600k'
    },
    {
      id: 1118,
      name: 'Startup Calabar',
      sponsor: 'Christian Nwamba',
      seedFund: '800k'
    },
    {
      id: 1119,
      name: 'Startup Nairobi',
      sponsor: 'Aniedi Ubong',
      seedFund: '700k'
    }];
  
    res.json(publicBattles);
});

app.get('/api/battles/private', (req, res) => {

    console.log('server: api private invocada...');
  
    const auth = req.get("authorization");
    if (!auth) {
        res.json({});
        return;
    }
    let idToken = auth.split("Bearer ").pop();
  
    let privateBattles = [
    {
      id: 2111,
      name: 'Startup Seattle',
      sponsor: 'Mark Zuckerberg',
      seedFund: '10M'
    },
    {
      id: 2112,
      name: 'Startup Vegas',
      sponsor: 'Bill Gates',
      seedFund: '20M'
    },
    {
      id: 2113,
      name: 'Startup Addis-Ababa',
      sponsor: 'Aliko Dangote',
      seedFund: '8M'
    },
    {
      id: 2114,
      name: 'Startup Abuja',
      sponsor: 'Femi Otedola',
      seedFund: '5M'
    },
    {
      id: 2115,
      name: 'Startup Paris',
      sponsor: 'Jeff Bezos',
      seedFund: '1.6M'
    },
    {
      id: 2116,
      name: 'Startup London',
      sponsor: 'Dave McClure',
      seedFund: '1M'
    },
    {
      id: 2117,
      name: 'Startup Oslo',
      sponsor: 'Paul Graham',
      seedFund: '2M'
    },
    {
      id: 2118,
      name: 'Startup Bangkok',
      sponsor: 'Jeff Clavier',
      seedFund: '5M'
    },
    {
      id: 2119,
      name: 'Startup Seoul',
      sponsor: 'Paul Buchheit',
      seedFund: '4M'
    }];
  
    // console.log('idToken recibida: ' + idToken); 
    // Verify the ID token and decode its payload.
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
        var uid = decodedToken.uid;
        console.log('Token verificado: ');
        // ...
        res.json(privateBattles);  
    }).catch(function(error) {
        // Handle error
        console.log('Error verificando token: ' + e);
        res.json({});
    });
  });
  
exports.app = functions.https.onRequest(app);