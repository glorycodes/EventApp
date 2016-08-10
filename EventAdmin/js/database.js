(function () {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhrhS7R0XUA9h5V4YCQI6FVuRz625dAQM",
    authDomain: "cabbooking-55f03.firebaseapp.com",
    databaseURL: "https://cabbooking-55f03.firebaseio.com",
    storageBucket: "cabbooking-55f03.appspot.com",
  };

  firebase.initializeApp(config);


  // Create database references
  const dbRefUsers = firebase.database();
  const dbRefBookings = firebase.database();

  // Get booking inputs
  const pickupCode = document.getElementById("pickup");
  const destCode = document.getElementById("dest");
  const datepicker = document.getElementById("datepick");
  const timepicker = document.getElementById("timepicker");
  const noOfAdults = document.getElementById("select-5");
  const noOfChild = document.getElementById("select-6");
  const btnLogout = document.getElementById('btnLogout');
  const btnBookCab = document.getElementById("btnBookCab");
  const bookingMsg = document.getElementById("bookingMsg");
  const bookingDetails = document.getElementById("bookingDetails");

  //Add a firebase realtime listener if user exists
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  });

  // Add event for Cab booking button
  if (btnBookCab != null) {
    btnBookCab.addEventListener('click', e => {
      dbRefBookings.ref().child("booking").push({
        //user: currentUser.uid,
        pickup: pickupCode.value,
        destination: destCode.value,
        date: datepicker.value,
        time: timepicker.value,
        Adults: noOfAdults.value,
        Child: noOfChild.value
      });
      dbRefBookings.on('child_added', snap => {
          var detail = snap.val();

          bookingDetails.innerText = 
            detail.val().pickup + 
            detail.val().destination + "\n" + 
            detail.val().date + "\n" +
            detail.val().time + "\n" +
            detail.val().Adults + "\n" +
            detail.val().Child;
          })
    });
    
    window.location.href = "view_bookings.html";
  } 





}());


    