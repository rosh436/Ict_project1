// Simple list of time zones by continent
const timezones = {
    America: [
        "America/New_York",
        "America/Chicago",
        "America/Denver",
        "America/Los_Angeles",
        "America/Toronto"
    ],
    Europe: [
        "Europe/London",
        "Europe/Paris",
        "Europe/Berlin",
        "Europe/Madrid"
    ],
    Asia: [
        "Asia/Tokyo",
        "Asia/Singapore",
        "Asia/Dubai",
        "Asia/Kolkata"
    ],
    Africa: [
        "Africa/Cairo",
        "Africa/Johannesburg",
    ],
    Australia: [
        "Australia/Sydney",
        "Australia/Melbourne",
        "Australia/Perth"
    ]
};

function populateTimezoneSelect(continentId, zoneSelectId) {
    const continent = document.getElementById(continentId).value;
    const zoneSelect = document.getElementById(zoneSelectId);

    zoneSelect.innerHTML = "";
    timezones[continent].forEach(zone => {
        zoneSelect.innerHTML += `<option value="${zone}">${zone}</option>`;
    });
}

// Initialize both dropdown sets
document.getElementById("startContinent").onchange = () =>
    populateTimezoneSelect("startContinent", "startTimezone");
document.getElementById("endContinent").onchange = () =>
    populateTimezoneSelect("endContinent", "endTimezone");

populateTimezoneSelect("startContinent", "startTimezone");
populateTimezoneSelect("endContinent", "endTimezone");

// Convert button click
document.getElementById("convertBtn").onclick = () => {
    const startZone = document.getElementById("startTimezone").value;
    const endZone = document.getElementById("endTimezone").value;

    const date = document.getElementById("startDate").value;
    const time = document.getElementById("startTime").value;

    if (!date || !time) {
        document.getElementById("result").innerText = "Please enter date and time.";
        return;
    }

    const dateTimeStr = `${date}T${time}`;
    const startDateObj = new Date(dateTimeStr);

    // Convert using Intl
    const result = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: endZone
    }).format(startDateObj);

    document.getElementById("result").innerText = result;
};
