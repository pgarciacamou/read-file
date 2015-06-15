// ----
// CONSTRUCTOR
// 
// name: FileHandler 
//  Handles input files and reads the data.
//  Once the file is loaded it will execute the callback with that file.
function FileHandler(options){
  if(!(window.File && window.FileReader && window.FileList && window.Blob)) throw new Error("File APIs not supported in current browser");
  this.elem = options.element;
}
FileHandler.prototype = {
  constructor: FileHandler,

  // ----
  // PUBLIC METHOD
  // ** onload **
  // 
  // Sets the callback for the data collected from the files
  // 
  // PARAMETERS
  //  callback :: function that receives each parsed file.
  onload: function(callback){
    if(this.listener) this.elem.removeEventListener("change", this.listener);
    this.callback = callback;
    this.listener = this.elem.addEventListener("change", this._handleChange.bind(this));
  },

  // ----
  // PRIVATE METHOD
  // ** _handleChange **
  // 
  // Handles load of files and parsing.
  // Also, executes the callback when the data is parsed.
  // 
  // PARAMETERS
  //  event :: receives the Event from the browser.
  //           We use this event to get the files selected
  // 
  // CALLBACK ARGUMENTS
  //  data  :: Array of Objects (each row in the file is a JavaScript object in the Array)
  //  index :: index of the file starting from 0. 
  //           This index is related to the files selected.
  //           It can have a different order than the expected.
  //  file  :: actual file
  //           You can gather information like name, type of file and bytes.
  //           Filtering by name is more reliable than filtering by index.
  _handleChange: function(event){
    Array.prototype.forEach.call(event.target.files, function(file, index){
      var reader = new FileReader();
      reader.addEventListener("load", function(e) {
        this.data = e.target.result.trim().split("\n").map(function(value, index, array){
          return JSON.parse(value);
        });
        this.callback.call(this, this.data, index, file);
      }.bind(this));
      reader.readAsText(file);
    }.bind(this));
  }
};