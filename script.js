//Get user input and make API Request
$("#submit").on("click", function (event) {
    event.preventDefault();
    var month = $("#month").val()
    var day = $("#day").val()


    var queryURL = "https://byabbe.se/on-this-day/" + month + "/" + day + "/events.json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        createRow(response);
        console.log(response)
    })
})


var createRow = function (data) {
    // Create a new table row element
    var results = $("#search-results");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    $("#date").text(data.date);
    $("#year").text(data.events[0].year);
    $("#description").text(data.events[0].description);
    // var actorsp = $("<td>").text(data.Actors);

    // Append the newly created table data to the table row
    // results.prepend(datep, yearp, eventp);
    // Append the table row to the table body
    // results.append(tRow);
};

function everyDay() {
    for (let i = 1; i < 13; i++) {
        if (i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i === 10 || i === 12) {
            for (let j = 1; j < 32; j++) {
                var queryURL = "https://byabbe.se/on-this-day/" + i + "/" + j + "/events.json";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    // createRow(response);
                    console.log(response)
                })
            }

        // } else if (i === 4 || i === 6 || i === 9 || i === 11) {
        //     for (let k = 1; k < 32; k++) {
        //         for (let j = 1; j < 32; j++) {
        //             var queryURL = "https://byabbe.se/on-this-day/" + i + "/" + k + "/events.json";
        //             $.ajax({
        //                 url: queryURL,
        //                 method: "GET"
        //             }).then(function (response) {
        //                 // createRow(response);
        //                 console.log(response)
        //             })
        //         }
        //     }
        // } else {
        //     for (let l = 1; l < 29; l++) {
        //         for (let j = 1; j < 32; j++) {
        //             var queryURL = "https://byabbe.se/on-this-day/" + i + "/" + l + "/events.json";
        //             $.ajax({
        //                 url: queryURL,
        //                 method: "GET"
        //             }).then(function (response) {
        //                 // createRow(response);
        //                 console.log(response)
        //             })
        //         }
        //     }
        // }
    }

}
}

everyDay();
