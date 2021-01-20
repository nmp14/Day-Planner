// Create local time for jumbotron header
let now = luxon.DateTime.local();
let f = { month: 'long', day: 'numeric' };
$("#currentDay").html(now.setLocale('en-US').toLocaleString(f) + "<sup>th</sup>");