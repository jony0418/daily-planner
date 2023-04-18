
$(function () {
    //Here we are defining the variables that we will use to store the start and end hours for the planner
    var startHour = 9;
    var endHour = 17;
  
    displayCurrentDate();
    generateTimeBlocks(startHour, endHour);
    loadSavedEvents();
  
    $(".saveBtn").on("click", saveEvent);
    $("#eraseAllBtn").on("click", eraseAll);
  
    //This function displays the current date and time in the header
    function displayCurrentDate() {
      $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
    }
  
    //Here we are adding the function that generates the time blocks for the planner and adds them to the page
    function generateTimeBlocks(startHour, endHour) {
      for (let i = startHour; i <= endHour; i++) {
        var timeBlock = $('<div class="row time-block">');
        timeBlock.attr("id", `hour-${i}`);
    
        var hourEl = $('<div class="col-2 col-md-1 hour text-center py-3">');
        hourEl.text(dayjs().hour(i).format("hA"));
    
        var textareaEl = $('<textarea class="col-8 col-md-10 description" rows="3">');
        var colorClass = getColorClass(i);
        textareaEl.addClass(colorClass);
    
        var saveBtn = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
        saveBtn.html('<i class="fas fa-save" aria-hidden="true"></i>');
    
        timeBlock.append(hourEl, textareaEl, saveBtn);
        $(".container-lg").append(timeBlock);
      }
    }
  
    //Here we are adding the function that determines the color of the time blocks based on the current time of day
    function getColorClass(hour) {
      var currentHour = dayjs().hour();
      if (hour < currentHour) {
        return "past";
      } else if (hour === currentHour) {
        return "present";
      } else {
        return "future";
      }
    }
  
    //Here we are adding the function that loads the saved events from local storage and displays them on the page
    function loadSavedEvents() {
      for (let i = startHour; i <= endHour; i++) {
        var savedEvent = localStorage.getItem(`hour-${i}`);
        if (savedEvent) {
          $(`#hour-${i} textarea`).val(savedEvent);
        }
      }
    }
  
    //Here we are adding the function that saves the event to local storage
    function saveEvent() {
      var timeBlock = $(this).closest(".time-block");
      var hour = timeBlock.attr("id");
      var eventText = timeBlock.find("textarea").val();
  
      localStorage.setItem(hour, eventText);
    }
  
    //Here we are adding the function that clears all events from local storage and the page when the "Erase All" button is clicked
    //I decide to add this function as an extra challenge to myself in order to practice using local storage, i look for the local 
    //storage clear function on the MDN web docs and found it here: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    function eraseAll() {
      localStorage.clear(); 
      //I also decided to add this line of code to clear the text area when the "Erase All" button is clicked
      $("textarea.description").val("");
    }
});
  