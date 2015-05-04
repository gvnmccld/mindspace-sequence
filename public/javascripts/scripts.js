/* Store the images for display and tracking purposes
   This could be obfuscated more depending on requirements
   It is randomized below */
var draggableItems = shuffle([
  { id: 0,
    src: "/sequence/images/lemon_step_1_master.jpg",
    anim: "/sequence/images/lemon_step_1_master.gif",
    order: 1,
    curr: 0 },
  { id: 1,
    src: "/sequence/images/lemon_step_2_master.jpg",
    anim: "/sequence/images/lemon_step_2_master.gif",
    order: 2,
    curr: 0 },
  { id: 2,
    src: "/sequence/images/lemon_step_3_master.jpg",
    anim: "/sequence/images/lemon_step_3_master.gif",
    order: 3,
    curr: 0 },
  { id: 3,
    src: "/sequence/images/lemon_step_4_master.jpg",
    anim: "/sequence/images/lemon_step_4_master.gif",
    order: 4,
    curr: 0 },
  { id: 4,
    src: "/sequence/images/lemon_step_5_master.jpg",
    anim: "/sequence/images/lemon_step_5_master.gif",
    order: 5,
    curr: 0 },
  { id: 5,
    src: "/sequence/images/lemon_step_6_master.jpg",
    anim: "/sequence/images/lemon_step_6_master.gif",
    order: 6,
    curr: 0 },
  { id: 6,
    src: "/sequence/images/lemon_step_7_master.jpg",
    anim: "/sequence/images/lemon_step_7_master.gif",
    order: 7,
    curr: 0 }
]);

var drops = document.getElementById("dropPoints").getElementsByTagName('div');

window.onload = function() {
  var container = document.getElementById("shuffled-images");
  var images = container.getElementsByTagName('img');

  // Initial image loading from object
  // Use the shuffled list to iterate through the video list
  for(var i = 0; i < draggableItems.length; i++) {
    var newId = Math.floor(Math.random()*90000) + 10000,
        myImg = document.createElement("img");
    
    // Set some attributes on the images so we can find them easily later    
    myImg.setAttribute('src', draggableItems[i].src);
    myImg.setAttribute('data-img_id', newId);
    myImg.setAttribute('id', 'image-'+newId);
    
    // Update the video object with our random ids for refrence
    draggableItems[i].id = newId
    draggableItems[i].id = newId;
    
    // Render the images to the page in our shuffled order
    container.appendChild(myImg);
      
  }
  
  // Setup "animation" of images based on mouseover/mouseout 
  for(var i = 0; i < images.length; i++) {
      images[i].addEventListener("mouseover", function (evt) {
        // if the images are dimmed, don't animate anymore
        if(!hasClass(this.parentElement, "dim")){
          var imgId = parseInt(this.dataset.img_id),                        
            image = document.getElementById("image-"+imgId),
            dragItem = findVideoById(imgId);
            
          this.src = dragItem.anim;
        }
        
      });
      images[i].addEventListener("mouseout", function () {
        // if the images are dimmed, don't animate anymore
        if(!hasClass(this.parentElement, "dim")){
          var imgId = parseInt(this.dataset.img_id),
              image = document.getElementById("image-"+imgId)
              dragItem = findVideoById(imgId);
          this.src = dragItem.src;
        }
      });
      images[i].removeEventListener("mouseout");
  }
  
  // Dropzone events
  for(var i = 0; i < drops.length; i++) {
    drops[i].addEventListener("drop", function (e) {
      drop(e);
    });
    drops[i].addEventListener("dragover", function (e) {
      e.preventDefault();
    });
  } 
  
  // Image dragging event
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("dragstart", function (e) {
      drag(e);
    }); 
  }
} 

// Helper to figure out if an element has a certain class
function hasClass(el, selector) {
   var className = " " + selector + " ";
  
   if ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
    return true;
   }
}

// Our main on-drag event
function drag(ev) {
    var el = document.getElementById(ev.target.id); 
    ev.dataTransfer.setData("htmlImageId", ev.target.id);
    ev.dataTransfer.setData("previous", ev.target.parentElement.dataset.position || "");
    dragItem = findVideoById(el.dataset.img_id);
    
    el.src = dragItem.src;    
}

// Our main on-drop event
function drop(ev) {
    ev.preventDefault();
    var htmlImageId = ev.dataTransfer.getData("htmlImageId");
    var el = document.getElementById(htmlImageId);
    var prevEl = parseInt(ev.dataTransfer.getData("previous"));
    var targetItem = findVideoById(ev.target.dataset.img_id);
    var currentItem = findVideoById(el.dataset.img_id); 

      // If the tag is an image, we're replacing or swapping images
      if(ev.target.tagName === "IMG") {
        var start = document.getElementById("shuffled-images"),
            pholder = ev.target.parentElement;
        
        // If prevEl is set, the new img came from another placeholder, swap the images 
        if(prevEl) {
          document.getElementById("drop-"+prevEl).appendChild(ev.target);
          targetItem.curr = prevEl;
          currentItem.curr = parseInt(pholder.dataset.position);
          pholder.appendChild(el);
        } else {
          // Else we dragged it from the left side, just add it to the placeholder
          start.appendChild(ev.target);
          targetItem.curr = 0;
          currentItem.curr = parseInt(pholder.dataset.position);
          pholder.appendChild(el);
        }
      
    } else {
        // There is not an image to replace, just add the image to the dropzone
        ev.target.appendChild(el);
        var dragItem = findVideoById(el.dataset.img_id);
        dragItem.curr = parseInt(ev.target.dataset.position);
    }
    
    // Check to see if the exercise is complete
    verifyOrder();
}
                
// Find the rest of the data based on our randomized item.id
function findVideoById(id) {
  return draggableItems.filter(function(item){return item.id === parseInt(id)})[0];  
}

// Fisher-Yates Shuffle
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
             
function verifyOrder() {
      var movedCount = document.getElementById("dropPoints").getElementsByTagName("img").length,
      totalItems = draggableItems.length,
      correctCount = 0,
      errorClass = "alert alert-danger col-sm-12 col-md-8 col-lg-5",
      successClass = "alert alert-success col-sm-12 col-md-8 col-lg-5";
  
  // If all of the images have been moved to the dropzones 
  if(movedCount === totalItems){
    // Check to see if the images are in the correct location
    for(var i = 0; i < draggableItems.length; i++) {
      var item = draggableItems[i],
          el = document.getElementById("image-" + draggableItems[i].id),
          messages = document.getElementById("messages");
        
        // If the img is in the correct location, add a class and increment our correct count  
        if(draggableItems[i].order === draggableItems[i].curr) {
          el.parentElement.className = "correct";
          correctCount += 1;
        } else {
           el.parentElement.className = "incorrect";
        }
        
        // Once all of the clips are in the correct order, play the video
        if(correctCount === totalItems) {
          document.getElementById('lemonVideo').play();
          LMS.pauseTime();
          var timeTaken = LMS.time();
          for(var i = 0; i < drops.length; i++){
            drops[i].className += " dim";
            drops[i].firstChild.setAttribute('draggable', false);
          }
          messages.className = successClass;
          messages.innerHTML = "Congratulations, you have passed this lesson! Total Time: " + timeTaken + " seconds.";
                    
        } else {
          messages.className = errorClass;
          messages.innerHTML = "You have " + correctCount + " out of " + totalItems + " clips correct! Keep Trying!"; 
        }
      } 
      updateLMS(correctCount);   
  } else {
     // If there are empty placeholders, we clear all of the correct/incorrect highlighting
     for(var i = 0; i < drops.length; i++){
      drops[i].className = "";
     }
  } 
  return correctCount;                      
}

function updateLMS(correctCount) {
    // Use the LMS API to update the score
     var newScore = parseInt(correctCount/draggableItems.length * 100);
     var prevScore = LMS.score();
     if(newScore > prevScore){
        // Set score to new score, user improved
        LMS.setScore(newScore);
      } 
     if(newScore > 80 && LMS.lessonStatus !== 'complete') {
        LMS.lessonStatus('complete');
     } 
}