// Create local time for jumbotron header
let now = luxon.DateTime.local();
let f = { month: 'long', day: 'numeric' };
$("#currentDay").html(now.setLocale('en-US').toLocaleString(f) + "<sup>th</sup>");

let container = $(".container");

function createTimeBlocks() {
    // Loops for creating time blocks from 8am to 6pm (i variable in military time)
    for (let i = 8; i < 19; i++) {
        let row = $("<div>");
        row.addClass("row mb-2")

        let hr = $("<hr>")

        // Add description
        let desc = $("<div>");
        desc.addClass("description");
        desc.html(i + ":00 - " + i + ":59");

        // Add timeblock
        let tb = $("<div>");
        tb.addClass("time-block");
        tb.html(`<textarea id=\`textarea${i}\` rows="4" cols="50" placeholder="Enter scheduled event"></textarea>`);

        // Add save button
        let button = $("<button>");
        button.addClass("saveBtn");
        button.html('<i class="fas fa-save larger-icon"></i>');

        row.append(desc, tb, button, hr);
        container.append(row);
    }
}

createTimeBlocks();