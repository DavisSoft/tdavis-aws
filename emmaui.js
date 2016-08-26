
'use strict';

//console.log('we dont need any console.log()s');

var serverURI = 'http://localhost:8080/session';
var testing = false;



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

function receiveMsg(s){
  //
  var d = new Date(Date.now()).toTimeString().substr(0, 8);
  $('#myConversation').prepend( '<div class="emma">' + d + '&nbsp' + s + '&nbsp' + $('#msgTextarea').val() + '</hr></div>');
  $('#myLastResponse').val(s);
}

function sendMsg(txt, type, sessionid){
  var auri = serverURI + '/?s=' + encodeURI(txt);
  console.log(auri);
  if (testing) {
    $.ajax(
      {
        url: auri
      })
      .done( function (data) {
        console.log( 'Sample of data:', data );
        receiveMsg( data.resp );
      } );
  } else {
    receiveMsg(txt);
    $('#myLastResponse').text(txt);
  }
}


var myReset = debounce(function() {
  $('.myhidden').toggleClass('isHidden');
}, 2500);

function toggleHidden(){
  $('.myhidden').toggleClass('isHidden');
  //console.log('>blink<');
  myReset();
}

function clickedMe(){
  var text = $('#msgTextarea').val();
  if (text.length) {
    var d = new Date(Date.now()).toTimeString().substr(0, 8);
    $('#myConversation').prepend( '<div >' + d + '&nbsp' + $('#msgTextarea').val() + '</hr></div>');
    $('#msgTextarea').val('');
    sendMsg(text);
  }

}
function resetMe(){
  $('#myConversation').text('');
}
function setLastResponse(txt){
  $('#myLastResponse').text(txt);
}


function showMyMessages(){
  console.log('myMessages');
  $('.messagePanel').toggleClass('isHidden');
}
