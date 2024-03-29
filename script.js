
let sheetId = '1CgfU3P2hKVxVyFHtAKKM53TR2S97A4C2ocUF-v8w6Z4';
let sheetName = 'FINGERPRINTING';
let clientId = '556195817456-cur82amnhtd7sb535s822pvcp0hnpbue.apps.googleusercontent.com'; // Replace with your OAuth client ID

function init() {
    gapi.client.init({
        clientId: clientId,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(function() {
        collectDataBtn.disabled = false;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const collectDataBtn = document.getElementById('collectDataBtn');
    const dataTableBody = document.getElementById('dataBody');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');

    collectDataBtn.addEventListener('click', function() {
        collectData();
    });

    function collectData() {
        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;

        // Access WLAN Signal Strength and Cellular Signal Strength using JavaScript APIs
        const wlanStrength = getWlanStrength();
        const cellularStrength = getCellularStrength();

        // Display collected data in table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${latitude}</td>
            <td>${longitude}</td>
            <td>${wlanStrength}</td>
            <td>${cellularStrength}</td>
        `;
        dataTableBody.appendChild(row);

        // Store collected data in Google Sheets
        appendToGoogleSheet(latitude, longitude, wlanStrength, cellularStrength);
    }

    // Function to get WLAN Signal Strength (Sample implementation)
    function getWlanStrength() {
        // Placeholder implementation
        return Math.floor(Math.random() * 100);
    }

    // Function to get Cellular Signal Strength (Sample implementation)
    function getCellularStrength() {
        // Placeholder implementation
        return Math.floor(Math.random() * 100);
    }

    // Function to append data to Google Sheets
    function appendToGoogleSheet(latitude, longitude, wlanStrength, cellularStrength) {
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: sheetName,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[latitude, longitude, wlanStrength, cellularStrength]]
            }
        }).then((response) => {
            console.log('Data appended:', response);
        }, (error) => {
            console.error('Error appending data:', error);
        });
    }

    // Load Google Sheets API
    gapi.load('client', init);
});
