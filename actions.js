let parkingLotSize,initialCarCount,carRegistrationNumber,carColor,registrationNumberSearch,searchAndEntry,start,colorOptions,registrationSearchSection;
let parkingLotArray = [];

function onload(){
parkingLotSize = document.getElementById('parkingLotSize');
initialCarCount=document.getElementById('initialCarCount');
carRegistrationNumber=document.getElementById('registration');
carColor=document.getElementById('color');
registrationNumberSearch=document.getElementById('registrationSearch');
searchAndEntry = document.getElementById('searchAndEntry');
start = document.getElementById('start');
colorOptions = document.getElementById("colorOptions");
registrationSearchSection = document.getElementById("registrationSearchSection");
}




function initializeParkingLot(){
let size = parseInt(parkingLotSize.value);
let carCount = parseInt(initialCarCount.value);   

if(isNaN(size) && isNaN(carCount)){
    window.alert("Please Fill the values before Submitting");
    return;
}
else if(size<=0){
    window.alert("Please Enter valid Values");
    return;
}

for(let k=0;k<size;k++){
    parkingLotArray[k] = {slotNo:k}
}


if(carCount <= size)
{
for( let i=0;i<carCount;i++){
    let car =  generateRandomCarInformation();
    parkingLotArray[i].color = car.color;
    parkingLotArray[i].registrationNumber = car.registrationNumber; 
    displayCarsTable();
}
}
else  {
alert("Number of cars cannot be greater than Parking lot size");
}


if (searchAndEntry.style.display === "none") {
    searchAndEntry.style.display = "block";
    start.style.display = "none";
} 
}




function generateRandomCarInformation(){

const states = ["KA","UK","KL","TN","AP"];
const colors = ["Black","White","Red","Blue"];

let getRandomColor = function(){
let  randColor = colors[Math.floor(Math.random() * colors.length)];
return randColor;
} 

let getRegistrationNumber = function(){
let  randState = states[Math.floor(Math.random() * states.length)];

let randDigits = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randTwoLetter = function(){
    var text = "";
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( var i=0; i < 2; i++ ) {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return text;
}


return randState + "-" + randDigits(10,99) + "-"+ randTwoLetter() + "-" + randDigits(0001,9999);

}

return {
color:getRandomColor(),
registrationNumber:getRegistrationNumber()
};

}



function displayCarsTable () {

let html = "<table border='1|1'>";
html+="<th>slot no.</th><th>Color</th><th>Registration no.</th><th>Action</th>"
for (let j = 0; j < parkingLotArray.length; j++) {
    if(parkingLotArray[j] != undefined && parkingLotArray[j].hasOwnProperty('color') && parkingLotArray[j].color != undefined && parkingLotArray[j].registrationNumber != undefined  ){
    html+="<tr>";
    html+=`<td>${parkingLotArray[j].slotNo+1}</td>`;
    html+="<td>"+parkingLotArray[j].color+"</td>";
    html+="<td>"+parkingLotArray[j].registrationNumber+"</td>";
    html+=`<td><button onclick=removeVehicle(${j});>Remove</button><td>`
    html+="</tr>";
    

    }
    else {
    html+="<tr>";
    html+=`<td>${parkingLotArray[j].slotNo+1}</td>`;
    html+="<td>"+"Empty"+"</td>";
    html+="<td>"+"Empty"+"</td>";
    html+="<td>"+"<button>Remove</button>"+"</td>";
    html+="</tr>";
    } 
    
}

html+="</table>";
document.getElementById("box").innerHTML = html;

}

function vehicleEntry(){

let carNumberRegEx = /[A-Z]{2}\-[0-9]{2}\-[A-Z]{2}\-\d{4}$/i;
let carRegNumber = carRegistrationNumber.value;
let carColour = carColor.value;
let regexResult = carNumberRegEx.test(carRegNumber);

if(carRegNumber=="" || carColour == ""){
    window.alert("Please Fill the values before Submitting");
    return;
}
else if(regexResult == false){
    window.alert("Please Enter Registration in Valid Format. eg. UK-07-KL-9090 ");
    return;
}

let emptySlotNumber = parkingLotArray.findIndex(function(element){
    return element.color == undefined || element.registrationNumber == undefined;
});

parkingLotArray[emptySlotNumber].color = carColour;
parkingLotArray[emptySlotNumber].registrationNumber=carRegNumber;
displayCarsTable();

}


function removeVehicle (index){
parkingLotArray[index].registrationNumber = undefined;
parkingLotArray[index].color = undefined;
displayCarsTable();
}



function showColorOptions(optionType){

if(optionType=="color"){
colorOptions.style.display = "block";
registrationSearchSection.style.display = "none";    
}
else if(optionType == 'number'){
    colorOptions.style.display = "none";
    registrationSearchSection.style.display = "block";   
}

}


function filterByColor(color){
let filterdByColor = parkingLotArray.filter(function(element){
    return element.color == color;
});
displayFilteredTable(filterdByColor);
}


function displayFilteredTable(filteredCars){
let html = "<table border='1|1'>";
html+="<th>slot no.</th><th>Color</th><th>Registration no.</th>"
for (let j = 0; j < filteredCars.length; j++) {
    if(filteredCars[j] != undefined && filteredCars[j].hasOwnProperty('color')){
    html+="<tr>";
    html+=`<td>${filteredCars[j].slotNo+1}</td>`;
    html+="<td>"+filteredCars[j].color+"</td>";
    html+="<td>"+filteredCars[j].registrationNumber+"</td>";
    html+="</tr>";
    }  
}

html+="</table>";
document.getElementById("box").innerHTML = html;

}


function filterByRegistrationNumber(){
let filteredByNumber = parkingLotArray.filter(function(element){
    return element.registrationNumber == registrationNumberSearch.value;
});
displayFilteredTable(filteredByNumber);
}
