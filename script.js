//http://api.weatherapi.com/v1/current.json?key= cba6b9f45a4646bf8f0194107263101&q=Mumbai&aqi=no


// Selecting the UI elements
// Selecting the UI elements - Selectors now match your HTML structure
const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const weatherField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_field"); 
const form = document.querySelector('form');

// Initial target
let target = 'Lucknow';

// 1. Function to fetch data from API
const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=cba6b9f45a4646bf8f0194107263101&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            console.error("Server Error:", data.error.message);
            alert("Location not found. Please try again.");
            return;
        }

        // Extracting data
        let locationName = data.location.name;
        let time = data.location.localtime;
        let tempCelsius = data.current.temp_c;
        let condition = data.current.condition.text;

        // 2. Updating the UI with the fetched data
        updateUI(tempCelsius, locationName, time, condition);

    } catch (error) {
        console.error("Fetch Error:", error);
    }
};

// 3. Helper function to manipulate the DOM
function updateUI(temp, location, time, condition) {
    // Adding checks to ensure fields exist before writing to them

    let splitDate = time.split(' ')[0];

     let splitTime = time.split(' ')[1];


    let currentDay = getDayName(new Date(splitDate).getDay());

    if (temperatureField) temperatureField.innerText = temp;
    if (locationField) locationField.innerText = location;
    if (dateField) dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    if (weatherField) weatherField.innerText = condition;
}

// 4. Event listener for the search form
function searchForLocation(e) {
    e.preventDefault();

    // Retrieves value from the search_field class
    target = searchField.value;

    if (target) {
        fetchResults(target);
    }
}

// Ensure the form exists before adding the listener to avoid "null" errors
if (form) {
    form.addEventListener('submit', searchForLocation);
}

// Initial call to populate the screen on load
fetchResults(target);


function getDayName(number){
    switch(number){
        case 0:
            return 'Sunday'
            
        case 1:
            return 'Monday'

        case 2:
            return 'Tueday'

        case 3:
            return 'Wednesday'

        case 4:
            return 'Thursday'

        case 5:
            return 'Friday'

        case 6:
            return 'Saturday'
            
    }
}

const cursor = document.querySelector('.cursor-follower');
const searchBtn = document.querySelector('.search_button');

