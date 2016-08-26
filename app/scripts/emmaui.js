
'use strict';

//console.log('we dont need any console.log()s');

var serverURI = 'http://localhost:8080/session';
var testing = false;


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
