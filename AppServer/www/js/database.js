

  // Get booking inputs
  var pickupCode = document.getElementById("pickup");
  var destCode = document.getElementById("dest");
  var datepicker = document.getElementById("datepick");
  var timepicker = document.getElementById("timepicker");
  var noOfAdults = document.getElementById("select-5");
  var noOfChild = document.getElementById("select-6");
  var btnLogout = document.getElementById('btnLogout');
  var btnBookCab = document.getElementById("btnBookCab");
  var bookingMsg = document.getElementById("bookingMsg");
  var bookingDetails = document.getElementById("eventsDetails");

  //Add a firebase realtime listener if user exists
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  });

  // Create database references
  var dbRefEvents = firebase.database();
  dbRefEvents.on('child_added', snap => {
          var detail = snap.val();

          bookingDetails.innerText = 
            detail.val().pickup + 
            detail.val().destination + "\n" + 
            detail.val().date + "\n" +
            detail.val().time + "\n" +
            detail.val().Adults + "\n" +
            detail.val().Child;
          });
