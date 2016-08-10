(function () {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhrhS7R0XUA9h5V4YCQI6FVuRz625dAQM",
    authDomain: "cabbooking-55f03.firebaseapp.com",
    databaseURL: "https://cabbooking-55f03.firebaseio.com",
    storageBucket: "cabbooking-55f03.appspot.com",
  };

  firebase.initializeApp(config);


  // Get user inputs
  var fName = document.getElementById('fname');
  var lName = document.getElementById('lname');
  var txtEmail = document.getElementById('email');
  var txtPass = document.getElementById('txtPass');
  var btnGPlus = document.getElementById('gplus');
  var btnSignup = document.getElementById('btnSignup');
  
  //Add event listener for Login Button
  
    if (btnLogin != null) {
        btnLogin.addEventListener('click', e => {
        var email = txtEmail.value;
        var pass = txtPass.value;
        var auth = firebase.auth();

        // Sign in
        var doLog = auth.signInWithEmailAndPassword(email, pass);
        doLog.catch(e => console.log(e.message));

        if (doLog != null){
          console.log("You have logged in");
          window.location.href = "dashboard.html";
        }else {
          console.log("Wrong or unavailable Account details");
        }
     });
    } 

  // Add event listener for Signup button
    if (btnSignup != null) {
      btnSignup.addEventListener('click', e => {
      var email = txtEmail.value;
      var pass = txtPass.value;
      var auth = firebase.auth();

      // Sign up
      var doSignup = auth.createUserWithEmailAndPassword(email, pass);
      doSignup.catch(e => console.log(e.message));

      if (doSignup != null) {
        console.log("Sign Up successful");

        dbRefUsers.ref().child("users/").push({
          firstname: fName.value,
          lastname: lName.value,
          email: txtEmail.value,
          tel: txtTel.value
        });

        window.location.href = "view_users.html";
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
    if (btnLogout != null) {
      btnLogout.addEventListener('click', e => {
        firebase.auth().signOut().then(function(){
          window.location.href = "index.html";
        });
      });
    } 


}());


    