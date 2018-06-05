$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyALk5ZHGb9lLxbWl7AFnbcZ6VzOUOs1BEs",
    authDomain: "traintime-261a4.firebaseapp.com",
    databaseURL: "https://traintime-261a4.firebaseio.com",
    projectId: "traintime-261a4",
    storageBucket: "",
    messagingSenderId: "101385687978"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var workAddress;
  var workAddressSecond;
  var workArriveTime;
  var priceHigh;
  var firstTrain;
  var MinutesAway;


  // moment("2014-02-27T10:00:00").format('DD-MM-YYYY');
  // moment.('2017-06-15').format("MM/DD/YY")

  console.log("the page loaded");

  $(document).on("click", "#btnSubmit", function(event){

  	event.preventDefault();

  	console.log("clicking");

  	train = $("#trainName").val().trim();
  	destination = $("#destination").val().trim();
  	firstTrain = $("#firstTrain").val().trim();
  	frequency = $("#frequency").val().trim();

    //Converts to time with moment.js
    firstTrain = moment(moment(firstTrain,"hh:mm A").subtract(1, "years"),"hh:mm").format("hh:mm A");

  	database.ref().push({
  		workAddress: workAddress,
  		workAddressSecond: workAddressSecond,
  		priceHigh: priceHigh,
  		frequency: frequency,
  		dataAdded: firebase.database.ServerValue.TIMESTAMP
  	});

    $("#table-display").empty();

  	// database.ref().on("child_added",function(childSnapshot){
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  		console.log(childSnapshot.val().firstTrain);
  		console.log(childSnapshot.val().frequency);
  		// console.log(childSnapshot.val().startDate);
  		// console.log(childSnapshot.val().monthlyRate);

  		// var date = moment(childSnapshot.val().startDate).format("MM/DD/YY");

      var train = childSnapshot.val().train;
      var destination = childSnapshot.val().destination;
      var firstTrain = childSnapshot.val().firstTrain;
      var frequency = childSnapshot.val().frequency;


    var timeDifference = moment().diff(moment(firstTrain,"hh:mm A"),'m');
    var timeRemaining = timeDifference % frequency;
    var timeMinsAway = frequency - timeRemaining;
    //console.log("Time diff in minutes:" + timeDifference); 
    //console.log("Time remaining before the next train:" + timeRemaining);

    // Calculate next arrival
    var MinutesAway = moment().add(timeMinsAway,'m');
    // var MinutesAway = moment(MinutesAway).format('m');
    console.log("Minutes until the next train " + MinutesAway);

    // Set variables
    var nextArrival = moment(MinutesAway).format("hh:mm A");
    // console.log("Formatted minutes: " + next);
    // console.log("Minutes away: " + away);

    
    var MinutesAway = moment(MinutesAway).format('m');
    console.log("Minutes until the next train " + MinutesAway);

    console.log(nextArrival);
    console.log(MinutesAway);

      

  		$("#table-display").append('<tr>'
                                  + '<td>' + childSnapshot.val().train +'</td>'
                                  + '<td>' + childSnapshot.val().destination +'</td>'
                                  + '<td>' + childSnapshot.val().frequency +'</td>'
                                  + '<td>' + nextArrival +'</td>'
                                  + '<td>' + MinutesAway +'</td>'
                                  // + '<td>' + moment().diff(moment.unix(date, "X"), "months") +'</td>'
                                  // + '<td>' + '30' +'</td>'
                                  +'</tr>'
        );

  	})

  });

  function pullData(){

  }

});