// DELPOY FIREBASE || START FUNCTION 
$(function () {
    let database = firebase.database();
 
    //CHILD ADDED
    database.ref("schedArr").orderByChild("dateAdded")
    .on("child_added", function (snapshot) {
        
        // VARIABLES 
        let currentSched = snapshot.val();
        let freqTime = currentSched.frequency;    
        let timeNow = moment();
        let firstTime = moment(currentSched.first, "hh:mm")
        .subtract(1, "years");
        let diffTime = moment().diff(moment(firstTime), "minutes");
        let remainder = diffTime % freqTime;
        let minutesAway = freqTime - remainder;
        let nextArrival = moment().add(minutesAway, "minutes", "HH:mm");
        let newRow = $("<tr class='tableRow'>");
        let currentName = $("<td class='name'>").text(currentSched.name);
        let currentDestination = $("<td class='destination'>").text(currentSched.destination);
        let currentFirstTime = $("<td class='first-train'>").text(moment(firstTime).format("h:mm A"));
        let currentFrequency = $("<td class='freq'>").text(currentSched.frequency + " minutes");
        let currentNextArrival = $("<td class='arrival'>").text(moment(nextArrival).format("h:mm A"));
        let currentMinutesAway = $("<td class='away'>").text(minutesAway);
      

        // ADDITIONS TO TABLE AND WORKING DYNAMICS 
        newRow.append(currentName)
            .append(currentDestination)
            .append(currentFirstTime)
            .append(currentFrequency)
            .append(currentNextArrival)
            .append(currentMinutesAway)
     

        $("tbody").append(newRow);
    
        
    })
        // SET VARIABELS TO INPUTS 
    $("form").off("submit").on("submit", function (e) {
        e.preventDefault();

        let trainName = $("#train-name").val().trim();
        let trainDestination = $("#train-destination").val().trim();
        let trainTime = $("#first-train-time").val().trim();
        let trainFreq = $("#train-frequency").val().trim();
     

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#first-train-time").val("");
        $("#train-frequency").val("");


        database.ref("schedArr").push({
            "name": trainName, 
            "destination": trainDestination, 
            "first": trainTime, 
            "frequency": trainFreq
        });
     
    })

})