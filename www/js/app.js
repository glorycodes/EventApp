// firebase api initialization
(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDaqH6X_JmI06L64vF4B75hPsE6ZRmttxc",
    authDomain: "eventapp-913e5.firebaseapp.com",
    databaseURL: "https://eventapp-913e5.firebaseio.com",
    storageBucket: "eventapp-913e5.appspot.com",

  };

  firebase.initializeApp(config);

  // Google Authentication provider
  var provider = new firebase.auth.GoogleAuthProvider();

  // Create database references for events
  var dbRefEvents = firebase.database();
  var dbRefProfiles = firebase.database();


  // Get user inputs
  var userfName = document.getElementById("userFirstName");
  var userlName = document.getElementById("userLastName");
  var userEmail = document.getElementById("userEmail");
  var userPass = document.getElementById("userPass");
  var gPlus = document.getElementById("gplus");
  var signIn = document.getElementById("signIn");
  var signUp = document.getElementById("signUp");
  var signOut = document.getElementById("signOut")

  // Get event booking
  var getEvent = document.getElementById("bookEvent");

  // Get elements of events details
  var img = document.getElementById("eventImg");
  var title = document.getElementById('eventTitle');
  var desc = document.getElementById("eventDesc");
  var longCoord = document.getElementById("eventLocation_long");
  var latCoord = document.getElementById("eventLocation_lat");
  var details = document.getElementById("eventsDetails");

  //Add event listener for Login Button
  if (signIn != null) {
    signIn.addEventListener('click', e => {
      var email = userEmail.value;
      var pass = userPass.value;
      var auth = firebase.auth();

      // Sign in
      var login = auth.signInWithEmailAndPassword(email, pass);

      if (login){
        console.log("You have logged in");
        window.location.href = "home.html";
      }else {
        login.catch(e => console.log(e.message));
      }
    });
  }

  // Add event listener for Signup button
    if (signUp != null) {
        signUp.addEventListener('click', e => {
        var email = userEmail.value;
        var pass = userPass.value;
        var auth = firebase.auth();

        // Sign up
        var logUp = auth.createUserWithEmailAndPassword(email, pass);
        logUp.catch(e => console.log(e.message));

        if (logUp != null) {
          console.log("Sign Up successful");

        dbRefProfiles.ref().child("profiles/").push({
          firstname: userfName.value,
          lastname: userlName.value,
          email: userEmail.value
        });
          window.location.href = "home.html";
        }
      });
    }

    // Add event listener for Logout button
    if (signOut != null) {
      signOut.addEventListener('click', e => {
        firebase.auth().signOut().then(function(){
          window.location.href = "index.html";
        });
      });
    }

    

  if (getEvent != null) {
    dbRefEvents.on('child_added', snap => {
      var detail = snap.val();
      console.log(detail);

      bookingDetails.innerText =
        detail.val().pickup +
        detail.val().destination + "\n" +
        detail.val().date + "\n" +
        detail.val().time + "\n" +
        detail.val().Adults + "\n" +
        detail.val().Child;
    });
  }

//Add a firebase realtime listener if user exists
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser.email);
      } else {
        console.log('not logged in');
      }
    });

// sign in using google popup method
    if (gPlus != null) {
      gPlus.addEventListener('click', e => {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });
    }

}());

