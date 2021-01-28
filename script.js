$(document).ready(function () {
    // Create local time for jumbotron header
    let now = luxon.DateTime.local();
    let f = { month: 'long', day: 'numeric' };
    $("#currentDay").html(now.setLocale('en-US').toLocaleString(f) + "<sup>th</sup>");

    let container = $(".container");

    let interval1, interval2;

    function createTimeBlocks() {
        // Loops for creating time blocks from 8am to 6pm (i variable in military time)
        for (let i = 8; i < 19; i++) {
            let row = $("<div>");
            row.addClass("row mb-2");

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

    function getLocalStorage(i) {
        for (i = 8; i < 19; i++) {
            let item = localStorage.getItem("text" + i);
            if (item && item !== "") {
                $(`#textArea${i}`).text(item);
            }
        }
    }

    function saveToLocalStorage(currentBtnId, text) {
        localStorage.setItem("text" + currentBtnId, text);
    }

    createTimeBlocks();
    getLocalStorage();

    $(".saveBtn").on("click", function () {
        // Get Id of the saveBtn clicked and remove the "btn" text.

        let currentBtnId = $(this).attr("id").split("btn")[1];
        let currentBoxId = `#textArea${currentBtnId}`;
        // Get text from textarea
        let text = $(currentBoxId).val();

        saveToLocalStorage(currentBtnId, text);
    })

    function saveToLocalStorage(currentBtnId, text) {
        localStorage.setItem("text" + currentBtnId, text);
    }

    // Start an interval to get next interval call starting when seconds = 0 (fresh minute)
    interval1 = setInterval(function () {
        let dt = luxon.DateTime.local();
        let second = dt.second;
        if (second === 0) {
            callTimeUpdate();
        }
    }, 1000)

    function callTimeUpdate() {
        // Stop interval 1 as we are on a fresh minute now.
        clearInterval(interval1);
        interval2 = setInterval(function () {
            let dt = luxon.DateTime.local();
            let minute = dt.minute;
            if (minute === 0) {
                let hour = parseInt(dt.hour);
                let tb = $(".time-block");
                for (let i = 0; i < tb.length; i++) {
                    console.log(tb[i].id.split("tb")[1]);
                    // check time of time block based on id and compare to hour. 
                    if ((parseInt(tb[i].id.split('tb')[1])) < hour) {
                        if ($(tb[i]).hasClass("present")) {
                            $(tb[i]).removeClass("present");
                        }
                        $(tb[i]).addClass("past");
                    } else if ((parseInt(tb[i].id.split('tb')[1])) === hour) {
                        $(tb[i]).removeClass("future");
                        $(tb[i]).addClass("present");
                    } else if ((parseInt(tb[i].id.split('tb')[1])) > hour) {
                        $(tb[i]).removeClass("present");
                        $(tb[i]).addClass("future");
                    }
                };
            }
        }, 60000);
    }
});