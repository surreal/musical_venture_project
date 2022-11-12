/* jshint esversion: 6 */

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDMiYW0HyU7E9Db3g27ZrTCyrm0dPGRcys",
        authDomain: "musical-venture-pro.firebaseapp.com",
        projectId: "musical-venture-pro",
        storageBucket: "musical-venture-pro.appspot.com",
        messagingSenderId: "258437758458",
        appId: "1:258437758458:web:c5330a0353d7122a5cf843",
        measurementId: "G-HSV3E9HV50"
    };
    firebase.initializeApp(config);

    $(document).ready(function(){
        $("#loginDiv").show();
        $("#loggedDiv").hide();
    });


function login(){
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function logout(){ firebase.auth().signOut(); }

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('Signed In');
        //var user = firebase.auth().currentUser;
        $("#loggedUser").text(user.email);
        $("#loginDiv").hide();
        $("#loggedDiv").show();
    } else {
        // No user is signed in.
        console.log('NOT Signed In');
        $("#loginDiv").show();
        $("#loggedDiv").hide();
    }
});