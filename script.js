//Current Day events
function currentDay() {
    var month = new Date().getMonth();
    var day = new Date().getDate();

    var randEntry = Math.floor(Math.random() * 10);

    var queryURL = "https://byabbe.se/on-this-day/" + month + "/" + day + "/events.json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        var randEntry = Math.floor(Math.random() * res.events.length);
        $("#date0").text(res.date);
        $("#year0").text(res.events[randEntry].year);
        $("#description0").text(res.events[randEntry].description);
    })

}

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

//Create row for search result
var createRow = function (data) {
    $("#date").text(data.date);

    for(i=0; i < data.events.length; i++){
        var resultDiv = $('<div id = "search-results">');
        var yearP = $('<p class = "year">').text(data.events[i].year)
        var descriptionP = $('<p class = "description">').text(data.events[i].description)

        resultDiv.append(yearP, descriptionP);

        $('.search-results-div').append(resultDiv);
    }

};

//Functions for getting all the dates and sorting them
async function sortDates() {

    let allDates = await everyDay();

    useData(allDates);
}

async function everyDay() {
    var dates = [];
    for (let i = 1; i < 13; i++) {
        if (i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i === 10 || i === 12) {
            for (let j = 1; j < 32; j++) {
                var queryURL = "https://byabbe.se/on-this-day/" + i + "/" + j + "/events.json";
                await $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    dates.push(response);
                })
            }

        } else if (i === 4 || i === 6 || i === 9 || i === 11) {
            for (let k = 1; k < 31; k++) {


                var queryURL = "https://byabbe.se/on-this-day/" + i + "/" + k + "/events.json";
                await $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    dates.push(response);
                })
            }

        } else {
            for (let l = 1; l < 30; l++) {
                var queryURL = "https://byabbe.se/on-this-day/" + i + "/" + l + "/events.json";
                await $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {

                    dates.push(response);
                })
            }
        }
    }

    return dates;

}


//Heat map
function useData(value) {

    for (i = 0; i < value.length; i++) {

        var dateDiv = $('<div class = "heat-map-day">').css('background-color', `rgb(69, ${value[i].events.length * 3}, 69)`);
        var dateP = $('<p>').text(value[i].date)

        dateDiv.append(dateP);

        $('.heat-map-year').append(dateDiv);

    }


}

currentDay();
sortDates();

