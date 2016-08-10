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
  const fName = document.getElementById('fname');
  const lName = document.getElementById('lname');
  const txtEmail = document.getElementById('email');
  const txtTel = document.getElementById('tel');
  const txtPass = document.getElementById('txtPass');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  
  //Add event listener for Login Button
  
    if (btnLogin != null) {
        btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPass.value;
        const auth = firebase.auth();

        // Sign in
        const doLog = auth.signInWithEmailAndPassword(email, pass);
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
      const email = txtEmail.value;
      const pass = txtPass.value;
      const auth = firebase.auth();

      // Sign up
      const doSignup = auth.createUserWithEmailAndPassword(email, pass);
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


    