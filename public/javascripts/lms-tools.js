// Fake LMS API for testing
var LMS = {
  currScore: 0,
  lessonStatus: 'incomplete',
  lessonTime: 0,
  timer: null,
  prevLesson: null,
  myNextLesson: null,
  setScore: function(score) {
    this.currScore = score;
  },
  score: function() {
    return this.currScore;
  },
  pauseTime: function () {
    return true;
  },
  lessonStatus: function(status) {
    if(status === 'complete' || status === 'incomplete') {
      this.lessonStatus = status;
    }
    if(!status){
      return this.lessonStatus;
    }
  },
  time: function() {
    return this.lessonTime;
  },
  startTime: function() {
    this.countTime();
  },
  pauseTime: function() {
     clearInterval(this.timer);
     return this.lessonTime;
  },
  resumeTime: function() {
    this.countTime();
  },
  setTime: function(newTime) {
    this.lessonTime = newTime;
  },
  nextLesson: function () {
    return this.myNextLesson;
  },
  previousLesson: function () {
    return this.prevLesson;
  },
  next: function () {
    if(this.lessonStatus === 'complete' && this.myNextLesson != null) {
      // Show achievement if exists
      // Navigate to next lesson
    }
  },
  previous: function () {
    if(this.prevLesson != null) {
      // Navigate back to previous lesson
    }
  },
  countTime: function () {
    var self = this;
    this.timer = setInterval(function () { 
      self.lessonTime += 1; 
    }, 1000);
  },
  setFlag: function (callback) {
    return true;
  },
  removeFlag: function(callback) {
    return true;
  },
  getFlagStatus: function(callback) {
    return true;
  }
  
};

// Start the timer when page loads
(function() {
  LMS.startTime();
})();