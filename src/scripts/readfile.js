// ----
// PUBLIC FUNCTION
// ** dataReceiver **
// 
// Used as callback for the FileHandler
// Shows how the parameters can be used.
var dataBuffer = [];
function dataReceiver(data, index, file){
  dataBuffer.push(data);
  if(index > 100) return;
  console.log(file.name, index);
  console.log(data[0].gamma);
}

// ----
// PUBLIC FUNCTION
// 
// Initializes the FileHandler instance and sets the callback.
function initFileHandler(){
  new FileHandler({
    element: document.querySelector("input#file-input")
  }).onload(dataReceiver);
}

// ----
// EVENT LISTENER
// 
// JavaScript best practice
// Only start working when the Document Object Model (DOM) is loaded.
document.addEventListener("DOMContentLoaded", initFileHandler);