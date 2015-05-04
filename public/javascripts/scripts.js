var draggableItems = [
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
];
var drops = document.getElementById("dropPoints").getElementsByTagName('div');
window.onload = function() {
  var container = document.getElementById("shuffled-images");
  var images = container.getElementsByTagName('img');
  
  
  // Initial image loading from object
  for(var i = 0; i < draggableItems.length; i++) {
    var myImg = document.createElement("img");
    myImg.setAttribute('src', draggableItems[i].src);
    myImg.setAttribute('data-img_id', draggableItems[i].id);
    myImg.setAttribute('id', 'image-'+draggableItems[i].id);
    container.appendChild(myImg);  
  }
  
  // Setup "animation" of images based on mouseover/mouseout 
  for(var i = 0; i < images.length; i++) {
      images[i].addEventListener("mouseover", function (evt) {
        // if the images are dimmed, don't animate anymore
        if(!hasClass(this.parentElement, "dim")){
          var imgId = this.dataset.img_id,
            image = document.getElementById("image-"+imgId);
          this.src = draggableItems[imgId].anim;
        }
        
      });
      images[i].addEventListener("mouseout", function () {
        // if the images are dimmed, don't animate anymore
        if(!hasClass(this.parentElement, "dim")){
          var imgId = this.dataset.img_id,
              image = document.getElementById("image-"+imgId);
          this.src = draggableItems[imgId].src;
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

function drag(ev) {
    var el = document.getElementById(ev.target.id); 
    ev.dataTransfer.setData("source", ev.target.id);
    ev.dataTransfer.setData("previous", ev.target.parentElement.dataset.position || "");
    el.src = draggableItems[el.dataset.img_id].src;    
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("source");
    var el = document.getElementById(data);
    var prevEl = parseInt(ev.dataTransfer.getData("previous")); 

      // If the tag is an image, we're replacing or swapping images
      if(ev.target.tagName === "IMG") {
      var start = document.getElementById("shuffled-images"),
          pholder = ev.target.parentElement;
      
      // If prevEl is set, the new img came from another placeholder, swap the images 
      if(prevEl) {
        document.getElementById("drop-"+prevEl).appendChild(ev.target);
        draggableItems[ev.target.dataset.img_id].curr = prevEl;
        draggableItems[el.dataset.img_id].curr = parseInt(pholder.dataset.position);
        pholder.appendChild(el);
      } else {
        start.appendChild(ev.target);
        draggableItems[ev.target.dataset.img_id].curr = 0;
        draggableItems[el.dataset.img_id].curr = parseInt(pholder.dataset.position);
        pholder.appendChild(el);
      }
 
      
    } else {
        // There is not an image to replace, just add the image to the dropzone
        ev.target.appendChild(el);
        draggableItems[el.dataset.img_id].curr = parseInt(ev.target.dataset.position);
    }
    
    // Check to see if the exercise is complete
    verifyOrder();
}

function verifyOrder() {
      var movedCount = document.getElementById("dropPoints").getElementsByTagName("img").length,
      totalItems = draggableItems.length,
      correctCount = 0;
  
  // If all of the images have been moved to the dropzones 
  if(movedCount === totalItems){
    // Check to see if the images are in the correct location
    for(var i = 0; i < draggableItems.length; i++) {
      var item = draggableItems[i],
          el = document.getElementById("image-" + draggableItems[i].id);
        
        // If the img is in the correct location, add a class and increment our correct count  
        if(draggableItems[i].order === draggableItems[i].curr) {
          el.parentElement.className = "correct";
          correctCount += 1;
        } else {
          console.log('hit')
           el.parentElement.className = "incorrect";
        }
        
      } 
  } else {
         for(var i = 0; i < drops.length; i++){
          drops[i].className = "";
         }
      }
      console.log(correctCount);
  if(correctCount == totalItems) {
    document.getElementById('lemonVideo').play();
    for(var i = 0; i < drops.length; i++){
        drops[i].className += " dim";
        drops[i].firstChild.setAttribute('draggable', false);
       }
  }  
}