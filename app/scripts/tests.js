'use strict';

(function() {
	$( '#sums-code-data' ).load( 'fortune.txt' );
	$( '#inh-code-data' ).load( 'fortune.txt' );
	$( '#fortune-code-data' ).load( 'fortune.txt' );

	//console.log('test functions loaded');
})();


function sumTo100(stuff) {
	var result = [];
	var inner, a, b;
	while (stuff.length) {
		a = stuff[0];
		for (inner = 1; inner < stuff.length; ){
			b = stuff[inner];
			if ((a + b) === 100){
				result.push([a, b]);
			}
			while (b === stuff[inner]) {
				inner++;
			}
		}
		while (a === stuff[0]) {
			stuff.shift();
		}
	}
	return result;
}

function Person(first, middle, last, motto) {
	this.firstName = first;
	this.middleName = middle;
	this.lastName = last;
	this.motto = motto;
}

Person.prototype.about = function(){
	return 'Hi, my name is ' + this.firstName + ' ' + this.middleName + ' ' + this.lastName + ' my motto is: ' + this.motto;
};

Person.prototype.toString = function(){
	return this.about();
};

function Job (jobName, desc) {
	this.applyingForJob = jobName;
	this.jobDesc = desc;
}

Job.prototype.about = function(){
	return this.applyingForJob + ': ' + this.jobDesc;
};

Job.prototype.toString = function(){
	return this.about();
};

function Candidate(person, theJob, desc) {
	this.person = person;
	this.job = theJob;
	this.description = desc;
}

Candidate.prototype.about = function(){
	return this.person.about() + ' and I am appying for ' + this.job.about() + ' ' + this.description;
};

Candidate.prototype.toString = function(){
	return this.about();
};

// fortune 'class' requires jquery
function Fortune() {
	this.get = function(){
		var that = this;
		$.ajax( 'https://fortunecookieapi.com/v1/cookie')
		.done(function( mydata ) {
			that.text = mydata[0].fortune.message;
		});
	};
	this.text = this.get();
	this.toString = function(){
		return this.text;
	};
}
Fortune.prototype.new = function(){
	this.get();
};


var description = 'in order to make this go quicker I hacked up some stuff so we can get on with it';
var f = new Fortune();
var me = new Person('Terrance', 'Alan', 'Davis', 'If I ever grow up I want to be just like me');
var job = new Job('Team Leader', 'Javascript development lead');
var candidate = new Candidate(me, job, description);
var nums = [1, 99, 50, 49, 51, 30, 99, 1, 99, 50, 49, 51, 30, 99, 1, 99, 50, 49, 51, 30, 99];
var snums = nums.sort();        // sort to improve efficiency
var list = sumTo100(snums);   // process the sorted list

$('#newFortune').hide();

$( '#runOne' ).click(function() {
	//alert( 'Handler 1 for .click() called.' );
	var i = 0;                        // display the list of pairs
	var results = 'pairs : ';
	for (i = 0; i < list.length; i++){
		results += list[i] + ' ';
	}
	$('#resultOne').text('results ' + results);
});

$( '#runTwo' ).click(function() {
	//alert( 'Handler 2 for .click() called.' );
	$('#resultTwo').text('result ' + candidate.toString());
});

$( '#runThree' ).click(function() {
	//alert( 'Handler 3 for .click() called.' );
	$('#resultThree').text('result ' + f.toString());
	$('#runThree').hide();
	$( '#newFortune').show();
});
$( '#newFortune').click(function(){
	$.when( $.ajax( 'https://fortunecookieapi.com/v1/cookie' ) ).then(function( data) {
		f.text = data[0].fortune.message;
		$('#resultThree').text('result ' + f.toString());
	});
});
