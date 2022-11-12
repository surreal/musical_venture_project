/* jshint esversion: 6 */
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const mysql = require('mysql');
// import { initializeApp } from 'firebase/app';
const firebase = require("firebase/app");
// const serviceAccount = require("./itcm-solutions-firebase-adminsdk-j333v-8c81b52a42.json");
// const admin = require("firebase-admin");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://itcm-solutions.firebaseio.com"
// });
// const firebaseStorage = admin.storage();
// const bucket = firebaseStorage.bucket('itcm-solutions.appspot.com');

console.log("index.js STARTED");

app.get('/sent', (request, response) => {
  console.log("Successfully get()");

  const con = mysql.createConnection({
    host: "35.192.41.8",
    user: "test_user",
    password: "Test2022"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Successfully Connected with DB");

    const name = request.query.name ? request.query.name : null;
    const phoneNumber = request.query.phone_number ? request.query.phone_number : null;
    const age = request.query.age ? request.query.age : null;
    const city = request.query.city ? request.query.city : null;
    const body = request.query.body ? request.query.body : null;
    const picturePath = request.query.picture_path ? request.query.picture_path : null;

    const isLikeToSingWhantToShow = request.query.is_like_to_sing_whant_to_show;
    const isHasVoiceFitsVocals = request.query.is_has_voice_fits_vocals;
    const isHasConfidence = request.query.is_has_confidence;
    const isKnowToDance = request.query.is_know_to_dance;

    const isPlayingGuitar = request.query.is_playing_guitar ? "כן" : "לא";
    const isPlayingElectricGuitar = request.query.is_playing_electric_guitar ? "כן" : "לא";
    const isPlayingTrumpet = request.query.is_playing_trumpet ? "כן" : "לא";
    const isPlayingDrums = request.query.is_playing_drums ? "כן" : "לא";
    const isPlayingKeyboards = request.query.is_playing_keyboards ? "כן" : "לא";

    const insertQuery = `INSERT INTO musical_venture_db.musical_venture_table VALUES (default, 
          '${name}', '${phoneNumber}', '${age}','${city}',
          '${isLikeToSingWhantToShow}', '${isHasVoiceFitsVocals}','${isHasConfidence}', '${isKnowToDance}',
          '${isPlayingGuitar}', '${isPlayingElectricGuitar}','${isPlayingTrumpet}', '${isPlayingDrums}', 
          '${isPlayingKeyboards}', '${body}', '${picturePath}')`;

    con.query(insertQuery, (error, result, fields) => {
        if(error) throw error.message; 
        response.redirect('https://musical-venture-opinions.firebaseapp.com/thanks.html');
    });
  });
});

app.get('/get_users', (request, response) => {
  console.log("Successfully get('/get_users')");

  const con = mysql.createConnection({
    host: "35.192.41.8",
    user: "test_user",
    password: "Test2022"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Successfully Connected with DB");

    const getProfileSql = `SELECT * FROM musical_venture_db.musical_venture_table`;
    con.query(getProfileSql, (error, result, fields) => {
        if(error) throw error.message;
        var array = [];
        for(i=0; i < result.length; i++){
          console.log("phone_number == " + result[i].phone_number + "; result[i].name == " + result[i].name);
          var profileObject = [];
          profileObject = {
            name:result[i].name, 
            phone_number:result[i].phone_number, 
            picture_path:result[i].picture_path,
            age:result[i].age,
            city:result[i].city,
            body:result[i].body,
            is_has_confidence:result[i].is_has_confidence,
            is_like_to_sing_whant_to_show:result[i].is_like_to_sing_whant_to_show,
            is_has_voice_fits_vocals:result[i].is_has_voice_fits_vocals,
            is_know_to_dance:result[i].is_know_to_dance,
            is_playing_guitar:result[i].is_playing_guitar,
            is_playing_electric_guitar:result[i].is_playing_electric_guitar,
            is_playing_trumpet:result[i].is_playing_trumpet,
            is_playing_drums:result[i].is_playing_drums,
            is_playing_keyboards:result[i].is_playing_keyboards,
          };
          array.push(profileObject);
        }
        /** response for ajax request from html  */
        response.send(array);
        console.log("fields == " + result[0].name);
    });
  });
});

exports.app = functions.https.onRequest(app);

// var firebase = require("firebase/app");
// var remoteFile = bucket.file('somefile-inThisCaseASong.mp3');
// var db = admin.database();
// var ref = db.ref("/");

// function handleFileUploadChange(e){
//    let selectedFile = e.target.files[0];
//    function handleFileUploadSubmit(e) {
//     const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
//     uploadTask.on('state_changed', (snapshot) => {
//     // Observe state change events such as progress, pause, and resume
//     }, (error) => {
//       // Handle unsuccessful uploads
//       console.log(error);
//     }, () => {
//        // Do something once upload is complete
//        console.log('success');
//     });
//   }
// }


// var file = "C:\Users\Andrey\Pictures\clouds-daylight-hd-wallpaper.jpg";
// firebase.storage().ref().put(file)
//     .then(snapshot => {
//         console.log('Uploaded.');
//     });

        //console.log('DB ref: ' + ref); //just to debug, if undefined, there's a problem.
// var gcloud = require('@google-cloud/storage');
// var gcs = gcloud.storage({
//   projectId: 'itcm-solutions',
//   keyFilename: 'C:/Users/Andrey/Desktop/Projects/Itcm/opinions/musical_venture/functions/itcm-solutions-firebase-adminsdk-j333v-8c81b52a42(1).json'
// });

// var firebaseConfig = {
//     apiKey: 'AIzaSyBhyTEns7LPZ-B_TE5hrX8KdlZ1iYtHLPY',
//     authDomain: 'itcm-solutions.firebaseapp.com',
//     databaseURL: 'https://itcm-solutions.firebaseio.com',
//     storageBucket: 'itcm-solutions.appspot.com'
//   };
//firebase.initializeApp(firebaseConfig);
// let storageService = firebase.storage().ref();
// let storageRef = storageService.ref();
// const appi = firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
