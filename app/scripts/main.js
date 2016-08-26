'use strict';

(function() {
  console.log('t d a v i s . d a v i s S o f t . c o m');
  console.log('all ur cod r us');
  console.log('Copyright (C) Terrance Davis 2015, 2016');
  console.log('scaffolding by yo webapp 2.0');
})();


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

function resetMe(){
  $('#myConversation').text('');
}

var myReset = debounce(function() {
  $('.myhidden').toggleClass('isHidden');
}, 2500);

function toggleHidden(){
  $('.myhidden').toggleClass('isHidden');
  //console.log('>blink<');
  myReset();
}
