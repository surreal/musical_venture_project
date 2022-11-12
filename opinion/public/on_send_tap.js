/*jshint esversion: 6 */

const firebaseConfig = {
    apiKey: "AIzaSyDMiYW0HyU7E9Db3g27ZrTCyrm0dPGRcys",
    authDomain: "musical-venture-pro.firebaseapp.com",
    projectId: "musical-venture-pro",
    storageBucket: "musical-venture-pro.appspot.com",
    messagingSenderId: "258437758458",
    appId: "1:258437758458:web:c5330a0353d7122a5cf843",
    measurementId: "G-HSV3E9HV50"
};
firebase.initializeApp(firebaseConfig);

$("#selectFileButtonId").on("change", function(event){
    var phoneNumber = $("#phoneNumber").val();
    console.log("uploadButton changed");
    selectedFile = event.target.files[0];
    console.log("uploadButton changed selectedFile == " + selectedFile);
    var storageRef = firebase.storage().ref(phoneNumber + '/Profile picture.jpg');
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed', function(snapshot){ 
    var progress =  
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
      var uploader = document.getElementById('uploader'); 
      uploader.value=progress;
      switch (snapshot.state) { 
        case firebase.storage.TaskState.PAUSED: 
          console.log('Upload is paused'); 
          break; 
        case firebase.storage.TaskState.RUNNING: 
          console.log('Upload is running'); 
          break; 
      } 
  }, function(error) {console.log(error); 
  }, function() { 
       // get the uploaded image url back 
       uploadTask.snapshot.ref.getDownloadURL().then( 
        function(downloadURL) { 
       // You get your url from here 
       $("#picturePath").val(downloadURL);
        console.log('File PATH: ', downloadURL); 
    }); 
  }); 
    console.log("uploadFile() Button Clickecked storageRef == " + storageRef);
});

$("#phoneNumber").on("change", function(event){
    var phoneNumber = $("#phoneNumber").val();
    if(phoneNumber.length > 8){
        $("#selectFileButtonId").attr("disabled", false);
    } else {
        $("#selectFileButtonId").attr("disabled", true);
    }
    console.log("phoneNumber changed -> phoneNumber == " + phoneNumber + "; phoneNumber.length == " + phoneNumber.length);
});

$("#submitBtn").on("click", function(event){
    console.log("clicked");
    var name = $("#name").val();
    var phoneNumber = $("#phoneNumber").val();
    var age = $("#age").val();
    var city = $("#city").val();

    if(name.length < 1){
        window.alert("שם לא יכול להיות ריק");
    } else if(phoneNumber.length <9){
        window.alert("מספר טלפון חייב להיות לפחות 9 ספרות");
    } else if(age.length < 1){
        window.alert("גיל לא יכול להיות ריק");
    } else if(city.length < 1){
        window.alert("עיר לא יכול להיות ריק");
    }
});