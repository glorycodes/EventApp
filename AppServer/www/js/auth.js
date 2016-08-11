// Google Authentication provider
  var provider = new firebase.auth.GoogleAuthProvider();


  // Get user inputs
  var userfName = document.getElementById('userFirstName');
  var userlName = document.getElementById('userLastName');
  var userEmail = document.getElementById('userEmail');
  var userPass = document.getElementById('userPass');
  var gPlus = document.getElementById('gplus');
  var signIn = document.getElementById('signIn');
  var signUp = document.getElementById('signUp');
  var signOut = document.getElementById('signOut')
  
  //Add event listener for Login Button
  
    if (signIn != null) {
        signIn.addEventListener('click', e => {
        var email = userEmail.value;
        var pass = userPass.value;
        var auth = firebase.auth();

        // Sign in
        var login = auth.signInWithEmailAndPassword(email, pass);
        login.catch(e => console.log(e.message));

        if (login != null){
          console.log("You have logged in");
          window.location.href = "home.html";
        }else {
          console.log("Wrong or unavailable Account details");
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

        dbRefUsers.ref().child("profiles/").push({
          firstname: userfName.value,
          lastname: userlName.value,
          email: userEmail.value
        });

        window.location.href = "home.html";
      }

    });
    } 

    //Add a firebase realtime listener if user exists
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
      }
    });

    // Add event listener for Logout button
    if (signOut != null) {
      signOut.addEventListener('click', e => {
        firebase.auth().signOut().then(function(){
          window.location.href = "index.html";
        });
      });
    } 

    if (gPlus != null) {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
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
    }
