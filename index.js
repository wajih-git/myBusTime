const statusElement = document.getElementById("status");

//Data base create function to store station name and naptanID
// Create app database and database functions
function createDatabase () {
  var dbRequest = window.indexedDB.open('myBusTimeDB', 1);
  const stationData = [
    { id: "station1", stationNameDB: "", stationIdDB: ""},
    { id: "station2", stationNameDB: "", stationIdDB: ""},
    { id: "station3", stationNameDB: "", stationIdDB: ""},
    { id: "station4", stationNameDB: "", stationIdDB: ""},
    { id: "station5", stationNameDB: "", stationIdDB: ""},
    { id: "station6", stationNameDB: "", stationIdDB: ""},
  ];

  dbRequest.onupgradeneeded = (event) => {
    var db = event.target.result;
    var objectStore = db.createObjectStore('busStopData', { keyPath: 'id' });
    objectStore.transaction.oncomplete = (event) => {
      const stationObjectStore = db
      .transaction("busStopData", "readwrite")
      .objectStore("busStopData");
    stationData.forEach((station) => {
      stationObjectStore.add(station);
    });
    };
  };

  dbRequest.onerror = (event) => {
    statusElement.innerHTML = "Error, re-install the app";
  };
}

// Store app data in the database
function updateStationData(stationName, stationId) {
  // Open database
  const dbRequest = window.indexedDB.open('myBusTimeDB', 1);

  // Handle database errors
  dbRequest.onerror = function(event) {
    console.log('Database error: ' + event.target.errorCode);
  };

  // Success handler for opening database
  dbRequest.onsuccess = function(event) {

    // Get reference to database
    const db = event.target.result;

    // Open transaction and object store
    const transaction = db.transaction(["busStopData"], "readwrite");
    const objectStore = transaction.objectStore("busStopData");

    // Open cursor to loop through records
    objectStore.openCursor().onsuccess = function(event) {

      const cursor = event.target.result;

      // Check if record exists
      if (cursor) {

        // Get current record
        const data = cursor.value;

        // Check if station name is empty
        if (data.stationNameDB == "") {

          // Update station name and id
          data.stationNameDB = stationName;
          data.stationIdDB = stationId;

          // Update record in database
          const requestUpdate = objectStore.put(data);

          requestUpdate.onerror = function(event) {
            console.log('Error updating record');
          };

          requestUpdate.onsuccess = function(event) {
          console.log('Record updated successfully');
          };

        } else {
          // Move cursor to next record
          cursor.continue();
        }

      } else {
        // No empty records found
        statusElement.innerHTML += 'No free records'; 
      }

    };
  };
}

  
//function to delete a station while keepting the structure of the database
function deleteStationID(stationId) {
  let noStation = false;
  // Open database
  const dbRequest = window.indexedDB.open('myBusTimeDB', 1);

  dbRequest.onsuccess = function(event) {

    const db = event.target.result;

    const transaction = db.transaction(["busStopData"], "readwrite");
    const objectStore = transaction.objectStore("busStopData");

    // Get record matching stationId
    const request = objectStore.get(stationId);

    request.onsuccess = function(event) {
      
      const data = event.target.result;

      // Clear station name and id fields
      if (data.stationIdDB!= "") {
        data.stationNameDB = "";
        data.stationIdDB = "";
      }else {
        noStation = true;
      }
      // Update record
      const requestUpdate = objectStore.put(data);

      requestUpdate.onsuccess = function(event) {
        if (!noStation) {
          statusElement.innerHTML = 'Bus stop deleted';
        }else{
          statusElement.innerHTML = 'No station found';
        }
      }

    };

  };

}



//Retrieve naptanID from database and make API call based on key pressed
function pressKey(pressedKey) {
  const dbRequest = window.indexedDB.open('myBusTimeDB', 1);

  dbRequest.onsuccess = function(event) {
    var db = event.target.result;
    const objectStore = db.transaction("busStopData").objectStore("busStopData");
    if (pressedKey == 1) {
       var getDataRequest = objectStore.get('station1');
       getDataRequest.onsuccess = (event) => {
       var getData = event.target;
       if (!(getData.result.stationIdDB == '')) {
         //make API call to NaptanID1
         getTflBusTimes(getData.result.stationIdDB);
         document.getElementById("top").textContent = 'Next buses at ' + getData.result.stationNameDB.slice(0, 10); ;
       }
      }
    }else if (pressedKey == 2) {
      var getDataRequest = objectStore.get('station2');
      getDataRequest.onsuccess = (event) => {
      var getData = event.target;
      if (!(getData.result.stationIdDB == '')) {
        //make API call to NaptanID2
        getTflBusTimes(getData.result.stationIdDB);
        document.getElementById("top").textContent = 'Next buses at ' + getData.result.stationNameDB.slice(0, 10);
      }
    }
    }else if (pressedKey == 3) {
      var getDataRequest = objectStore.get('station3');
      getDataRequest.onsuccess = (event) => {
      var getData = event.target;
      if (!(getData.result.stationIdDB == '')) {
        //make API call to NaptanID3
        getTflBusTimes(getData.result.stationIdDB);
        document.getElementById("top").textContent = 'Next buses at ' + getData.result.stationNameDB.slice(0, 10);
      }
    }
    }else if (pressedKey == 4) {
      var getDataRequest = objectStore.get('station4');
      getDataRequest.onsuccess = (event) => {
      var getData = event.target;
      if (!(getData.result.stationIdDB == '')) {
        //make API call to NaptanID4
        getTflBusTimes(getData.result.stationIdDB);
        document.getElementById("top").textContent = 'Next buses at ' + getData.result.stationNameDB.slice(0, 10);
      }
    }
    }else if (pressedKey == 5) {
      var getDataRequest = objectStore.get('station5');
      getDataRequest.onsuccess = (event) => {
      var getData = event.target;
      if (!(getData.result.stationIdDB == '')) {
        //make API call to NaptanID5
        getTflBusTimes(getData.result.stationIdDB);
        document.getElementById("top").textContent = 'Next buses at ' + getData.result.stationNameDB.slice(0, 10);
      }
      }       
    }else if (pressedKey == 6) {
      var getDataRequest = objectStore.get('station6');
      getDataRequest.onsuccess = (event) => {
      var getData = event.target;
      if (!(getData.result.stationIdDB == '')) {
        //make API call to NaptanID6
        getTflBusTimes(getData.result.stationIdDB);
        document.getElementById("top").textContent = 'Next buses at ' + getData.result.stationNameDB.slice(0, 10);
      }
      }
    }
  };
  getDataRequest.onerror = (event) => {
   statusElement.innerHTML = "Error";
  };  
}


//text label for menu
const menuLabel1 = document.createElement('label');
menuLabel1.innerHTML = "Press 1 for ";
const menuLabel2 = document.createElement('label');
menuLabel2.innerHTML = "<br>Press 2 for ";
const menuLabel3 = document.createElement('label');
menuLabel3.innerHTML = "<br>Press 3 for ";
const menuLabel4 = document.createElement('label');
menuLabel4.innerHTML = "<br>Press 4 for ";
const menuLabel5 = document.createElement('label');
menuLabel5.innerHTML = "<br>Press 5 for ";
const menuLabel6 = document.createElement('label');
menuLabel6.innerHTML = "<br>Press 6 for ";

//text lable for settings
const settingsLabel1 = document.createElement('label');
settingsLabel1.innerHTML = 'Press Add to add a new station to the menu <br>';
const settingsLabel2 = document.createElement('label');
settingsLabel2.innerHTML = 'Press Delete to remove a station from the menu';

const addSettingsLabel1 = document.createElement('label');
addSettingsLabel1.innerHTML = 'Stay within 200m of the bus stop you would like to add and type below the letter(s) on top of the bus stop pole. Then press Add:<br> ';

const addSettingsInput1 = document.createElement('input');
addSettingsInput1.type = 'text';
addSettingsInput1.name = 'add';
addSettingsInput1.maxLength = 2;
addSettingsInput1.size = 2;
addSettingsInput1.required = true;

const removeSettingsLabel1 = document.createElement('label');
removeSettingsLabel1.innerHTML = 'Type the number referring to the station you would like to delete and press Delete:<br>';

const naptanIDLabel1 = document.createElement('label');
naptanIDLabel1.innerHTML = 'NaptanID: ';
const naptanIDLabel2 = document.createElement('label');
naptanIDLabel2.innerHTML = 'NaptanID: ';
const naptanIDLabel3 = document.createElement('label');
naptanIDLabel3.innerHTML = 'NaptanID: ';
const naptanIDLabel4 = document.createElement('label');
naptanIDLabel4.innerHTML = 'NaptanID: ';
const naptanIDLabel5 = document.createElement('label');
naptanIDLabel5.innerHTML = 'NaptanID: ';
const naptanIDLabel6 = document.createElement('label');
naptanIDLabel6.innerHTML = 'NaptanID: ';


function addSettings() {

  // Use statusElement as the parent element
  statusElement.innerHTML = '';

  // Append inputs and labels 
  statusElement.appendChild(settingsLabel1);
  statusElement.appendChild(settingsLabel2);
 
}

function addAddSettings() {
  statusElement.innerHTML = '';
  statusElement.appendChild(addSettingsLabel1);
  statusElement.appendChild(addSettingsInput1);
  addSettingsInput1.focus();
}

function addRemoveSettings() {
  statusElement.innerHTML = '';
  let allEmpty = true;


  var dbRequest = indexedDB.open("myBusTimeDB");

  dbRequest.onsuccess = function(event) {

    var db = event.target.result;
    var objectStore = db.transaction("busStopData").objectStore("busStopData");

    objectStore.openCursor().onsuccess = function(event) {
    
      var cursor = event.target.result;

      if(cursor) {
        if (cursor.value.stationIdDB) {
          if (allEmpty) {
            statusElement.appendChild(removeSettingsLabel1);
          }
          allEmpty = false;
          statusElement.innerHTML += 'Press ' + cursor.value.id.slice(-1) + ' to delete ' + cursor.value.stationNameDB.slice(0, 15) + '<br>';
        }
        cursor.continue();
      } else {
        if (allEmpty) {
          //No data in database
          statusElement.innerHTML = 'Add bus stops using the Add button';
        }
      }
    };

  };
}

function addMenu() {
  statusElement.innerHTML = '';
  let allEmpty = true;

  var dbRequest = indexedDB.open("myBusTimeDB");

  dbRequest.onsuccess = function(event) {

    var db = event.target.result;
    var objectStore = db.transaction("busStopData").objectStore("busStopData");

    objectStore.openCursor().onsuccess = function(event) {
    
      var cursor = event.target.result;

      if(cursor) {
        if (cursor.value.stationIdDB) {
          statusElement.innerHTML += 'Press ' + cursor.value.id.slice(-1) + ' for ' + cursor.value.stationNameDB.slice(0, 15) + '<br>';
          allEmpty = false; 
        }
        cursor.continue();
      }else {
        // Done looping through records
        if (allEmpty) {
          // All stationIdDB values were empty
          statusElement.innerHTML = 'Add bus stops using settings';
        }
      }
    };

  };


}


// the bus time fetching function
function getTflBusTimes(naptanID) {

    const statusElement = document.getElementById('status');
  
  try {

    const apiUrl = `https://api.tfl.gov.uk/StopPoint/${naptanID}/Arrivals`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);

    xhr.responseType = "text";

    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          const predictions = JSON.parse(xhr.response); 

          predictions.sort((a, b) => {
            var timeA = new Date(a.expectedArrival);
            var timeB = new Date(b.expectedArrival);
            return timeA - timeB; 
          });

          predictions.forEach(prediction => {
            var currentTime = new Date();
            var lineName = prediction.lineName;
            var destinationNameFull = prediction.destinationName;
            var destinationName = destinationNameFull.substring(0, 12);
            var expectedArrival = prediction.expectedArrival;
            var arrivalTime = new Date(expectedArrival);
            var timeDiff = arrivalTime.getTime() - currentTime.getTime();
            var minutesLeft = Math.round(timeDiff / (1000 * 60));

            //var formattedTime = arrivalTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
            
            var displayText = `${lineName} to ${destinationName} in ${minutesLeft} min<br>`;
          
            // Display each prediction
            statusElement.innerHTML += displayText;
          
          });
          //statusElement.innerHTML += 'response' + xhr.response;
          //statusElement.innerHTML = JSON.stringify(busTimes);
        } else {
          statusElement.innerHTML = `Error: ${xhr.status}`;
        }
      }
    };

    xhr.onerror = () => {
      statusElement.innerHTML = 'Request failed';
    };

    xhr.send();    

  } catch (error) {
    statusElement.innerHTML = 'Error: ' + error.message;
  }
}

//get naptanID from geolocation and stopLetter
function getNaptanId(lat, lon, stopLetter, callback) {

  const xhr = new XMLHttpRequest();
  const url = `https://api.tfl.gov.uk/Stoppoint?lat=${lat}&lon=${lon}&stoptypes=NaptanPublicBusCoachTram&radius=300`;

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      for (let stopPoint of data.stopPoints) {
        if (stopPoint.stopLetter === stopLetter) {
          callback(stopPoint.naptanId, stopPoint.commonName); 
          return;
        }
      }
      
      callback(null, null);
    }
  };

  xhr.open('GET', url);
  xhr.send();

}

//getNaptanID from stop Letter based on gps location
function getNaptanIdByStopLetter(stopLetter, callback) {

  navigator.geolocation.getCurrentPosition(

    function(position) {
      // success callback
      
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Get naptanId and commonName
      getNaptanId(lat, lon, stopLetter, function(naptanId, commonName) {
        
        if (commonName) {
          commonName = commonName.slice(0, 17); 
        }
        
        callback(naptanId, commonName);
      });

    }, 

    function(error) {
      callback(null, null);
    }

  );

}




var isMenu = true;
var isSettings = false;
var isRefresh = false;
var isAddSettings = false;
var isRemoveSettings = false;
var StationMemory = '';

createDatabase();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "SoftLeft":
      isMenu = true;
      isSettings = false;
      isRefresh = false;
      isAddSettings = false;
      isRemoveSettings = false;
      addMenu();
      //Update bottom app controls
      document.getElementById("center").textContent = "Settings"; 
      document.getElementById("left").textContent = "Menu"; 
      document.getElementById("right").textContent = "Refresh";

      document.getElementById("top").textContent = "My Bus times from Papa";
      //getTflBusTimes('490000062H');
      //exit even listener
      break;
    case "SoftRight":
      if (!(isSettings || isAddSettings || isRemoveSettings)) {
        //refresh request
        isRefresh = true;
        isSettings = false;
        isMenu = false;
        isAddSettings = false;
        isRemoveSettings = false;
        statusElement.innerHTML = '';
        if (!(StationMemory == '')) {
          pressKey(StationMemory);
        } else {
          statusElement.innerHTML = 'Select a bus stop in the menu';
          document.getElementById("top").textContent = "My Bus times from Papa";
        }
      }else if (isSettings) {
        addRemoveSettings();
        isMenu = false;
        isSettings = true;
        isRefresh = false;
        isAddSettings = false;
        isRemoveSettings = true;
      }
        //exit even listener
     break;
    case "ArrowUp":
      if (isMenu || isRefresh) {
        document.getElementById("center").textContent = "Add"; 
        document.getElementById("left").textContent = "Menu"; 
        document.getElementById("right").textContent = "Delete";

        document.getElementById("top").textContent = "My Bus times from Papa";
        statusElement.innerHTML = '';
        addSettings();
        isMenu = false;
        isSettings = true;
        isRefresh = false;
        isAddSettings = false;
        isRemoveSettings = false;
      } else if (isSettings && !isAddSettings) {
        addAddSettings();
        isMenu = false;
        isSettings = true;
        isRefresh = false;
        isAddSettings = true;
        isRemoveSettings = false;
      } else if (isAddSettings) {
        statusElement.innerHTML = 'Please wait patiently';
        getNaptanIdByStopLetter(addSettingsInput1.value, function(naptanId, commonName) {
          if (naptanId) {
            //store naptanId and commonName in database
            updateStationData(commonName, naptanId);
            statusElement.innerHTML = commonName +' added to Menu';
          } else {
            statusElement.innerHTML = 'Bus stop not found';
          }
        });
        isMenu = false;
        isSettings = true;
        isRefresh = false;
        isAddSettings = false;
        isRemoveSettings = false;
      }
      break;
    case "1":
        if (!isSettings) {
          statusElement.innerHTML = '';
          StationMemory = "1";
          pressKey(1);
        } else if(isRemoveSettings) {
          deleteStationID("station1");
        }
      break;
    case "2":
      if (!isSettings) {
        statusElement.innerHTML = '';
        StationMemory = '2';
        pressKey("2");
      } else if(isRemoveSettings) {
        deleteStationID("station2");
      }
      break;
    case "3":
      if (!isSettings) {
        statusElement.innerHTML = '';
        StationMemory = "3";
        pressKey("3");
      } else if(isRemoveSettings) {
        deleteStationID("station3");
      }
      break;
    case "4":
      if (!isSettings) {
        statusElement.innerHTML = '';
        StationMemory = "4";
        pressKey("4");
      } else if(isRemoveSettings) {
        deleteStationID("station4");
      }
      break;
    case "5":
      if (!isSettings) {
        statusElement.innerHTML = '';
        StationMemory = "5";
        pressKey("5");
      } else if(isRemoveSettings) {
        deleteStationID("station5");
      }
      break;
    case "6":
      if (!isSettings) {
        statusElement.innerHTML = '';
        StationMemory = "6";
        pressKey("6");
      } else if(isRemoveSettings) {
        deleteStationID("station6");
      }
      break;
    //ignore other keys
    default:
      return;
    //close event listener function
  }
});