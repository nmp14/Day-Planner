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
        tb.attr("id", `tb${i}`);
        tb.html(`<textarea id="textArea${i}" rows="4" cols="50" maxlength="200" placeholder="Enter scheduled event"></textarea>`);

        // Add classes based on current time compared to the timeblock
        if (i < now.hour) {
            tb.addClass("past");
        } else if (i === now.hour) {
            tb.addClass("present");
        } else if (i > now.hour) {
            tb.addClass("future");
        }

        // Add save button
        let button = $("<button>");
        button.addClass("saveBtn");
        button.attr("id", `btn${i}`);
        button.html('<i class="fas fa-save larger-icon"></i>');

        row.append(desc, tb, button, hr);
        container.append(row);
    }
}

createTimeBlocks();

$(".saveBtn").on("click", function () {
    // Get Id of the saveBtn clicked and remove the "btn" text.
    let currentBtnId = $(this).attr("id").split("btn")[1];
    let currentBoxId = `#textArea${currentBtnId}`;
    let text = $(currentBoxId).val();
    console.log(text);

    saveToLocalStorage(currentBtnId, text);
})

function saveToLocalStorage(currentBtnId, text) {
    localStorage.setItem("text" + currentBtnId, text);
}