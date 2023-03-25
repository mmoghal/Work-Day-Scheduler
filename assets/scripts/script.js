// Get the current date and time using Moment.js

const currentDate = dayjs().format("dddd D MMM YYYY");
const currentHour = dayjs().format("h:mm:ss a");

// Get references to each hour block on the page
var hours = [$("#9am"), $("#10am"), $("#11am"), $("#12pm"), $("#13pm"), $("#14pm"), $("#15pm"), $("#16pm"), $("#17pm")];

// Get the current hour using Day.js
var hour = dayjs().hour();

// Initialize variables for user input and the hour span associated with it
var userInput;
var hourSpan;

// Set up a function to update the date and time
function updateDateTime() {
    // Get the current date and time using Day.js
    const dateTime = dayjs().format("MMMM D, YYYY h:mm:ss A");

    // Get the HTML element and update its content
    document.getElementById("currentDateTime").innerText = dateTime;

    // Set a timer to update the date and time every second
    setTimeout(updateDateTime, 1000);
}

// Call the updateDateTime function when the page loads
document.addEventListener("DOMContentLoaded", updateDateTime);

// Initialize the page by retrieving saved data from Local Storage
function initPage() {
    const timeSlots = ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm"];

    timeSlots.forEach((timeSlot, index) => {
        const value = JSON.parse(localStorage.getItem(timeSlot));
        hours[index].val(value);
    });
}

// Update the background color of each timeblock based on the current time
function background() {
    const timeblocks = document.querySelectorAll(".form-control");
    timeblocks.forEach((timeblock) => {
        const timeTest = parseInt(timeblock.getAttribute("id"));
        const currentHour = dayjs().hour();
        if (currentHour > timeTest) {
            timeblock.classList.add("past");
        } else if (currentHour < timeTest) {
            timeblock.classList.add("future");
        } else {
            timeblock.classList.add("present");
        }
    });
}

// Wait for the page to be fully loaded before executing any code
$(document).ready(function () {
    initPage();
    background();

    // Add click event listener to all "Save" buttons
    $(".saveBtn").on("click", function () {
        // Retrieve the user input and hour span associated with the clicked button
        userInput = $(this).siblings(".form-control").val().trim();
        hourSpan = $(this).siblings(".input-group-prefix").text().trim();
        // Save the user input to Local Storage
        localStorage.setItem(hourSpan, JSON.stringify(userInput));
    });

    // Add click event listener to the "Clear Day" button
    $("#clearSchedule").on("click", function () {
        localStorage.clear();
        // Refresh the page to reflect the updated data
        initPage();
    });
});
