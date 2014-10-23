
$( document ).ready(function() {
	




/* 	Global Variables
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	
var missions =[];
var missionCounter = 0;

var operationsAdjective = [];
var operationsNoun = [];
var operation = '';
var agentNames = [
	'Kiwi',
	'Finch',
	'Flamingo',
	'Seagull',
	'Parrot',
	'Pigeon',
	'Cuckoo',
	'Owl',
	'Hummingbird',
	'Ostrich',
	'Woodpecker',
	'Wren',
	'Swallow',
	'Oriole',
	'Woodlark',
	'Mockingbird',
	'Chickadee',
	'Partridge',
	'Starling',
	'Goose',
	'Duck',
	'Albatross',
	'Stork',
	'Heron',
	'Condor',
	'Vulture',
	'Raven',
	'Crow',
	'Kestrel',
	'Falcon',
	'Buzzard',
	'Eagle',
	'Crane',
	'Sandpiper',
	'Tern',
	'Dove',
	'Cockatoo',
	'Macaw',
	'Parakeet',
	'Roadrunner',
	'Nighthawk',
	'Magpie',
	'Robin',
	'Warbler',
	'Bluebird',
	'Nightingale',
	'Thrush',
	'Sparrow',
	'Finch',
	'Blackbird',
	'Meadowlark',
	'Cardinal',
	'Penguin'
	];
var agentName = '';

var shapes = [
	'circles',
	'squares',
	'lines'
	];

	
var colors = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'indigo',
	'violet'
	];


var priorityMissions = [
	'Priority Mission 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 6: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 7: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 8: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 9: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.',
	'Priority Mission 10: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim faucibus eros, nec elementum nulla cursus sit amet. Duis commodo diam eget dui placerat blandit.'
	];

var loadingMessages = [
	'Calibrating Frequencies',
	'Bypassing Security Protocols',
	'Initializing Firewall',
	'Securing Hardlink',
	'Crossing Streams'
	];	
	
/* 	FUNCTIONS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	//window.setInterval($('#loading-message').append('. '),300);	

function loading(){
	$('#loading').show();
	$('.container').hide();
	//audioPlayer('loading');
	
	var windowHeight = $(window).height();
	$('#loading').height(windowHeight);
	
	var loadingHeight = $('#loading-inner').height();
	var adjust = .5*(windowHeight-loadingHeight);
	$('#loading-inner').css('top', adjust+'px');
	
	//var message = $('#loading-message');
	
	function loadGenerator(){
		//shuffle(loadingMessages);
		//var newMessage = loadingMessages[0];
		//message.html(newMessage);
		
			
		var dotCount = 1;
		function addDot(){
			console.log('addDot()');		
			if (dotCount > 6){
				console.log('max dots!');		
				window.clearInterval(dotter)
			} else {
				console.log('adding dot...'+dotCount);
				/*var dot = $('<div>');
				dot.attr('class', 'load-dot move');		
				dot.attr('id', 'dot'+dotCount);
				$('#loading').append(dot);
				*/
				var dot = $('#dot'+dotCount).addClass('move');
				dotCount++;
			}
		};
		var dotter = window.setInterval(function(){addDot()},500);	
	}
	loadGenerator();
}

function setup(){
	// main screen fades in, on top of loading screen. 
	$('.container').show();
	$('#loading').hide();
	tutorial();
	assignAgentName();
	listMissions();
	toggleAddMission();
}

function writeToLocal(localName, value){
	//console.log('writing to local...'+localName);
	var string = JSON.stringify(value);
	//console.log('string to local: '+string);
	localStorage.setItem(localName, string)
}
function readFromLocal(localName){
	//console.log('getting item from local...'+localName);
	var string = localStorage.getItem(localName);
	//console.log('string from local: '+JSON.parse(string));
	return JSON.parse(string);
}

function shuffle(arr) {
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	return arr;
};

	
	
function tutorial(){
	console.log('checking Tutorial...'+readFromLocal('initialSetup'));
	if (readFromLocal('initialSetup') != null){
		console.log('skipping Tutorial...');
		return
	} else {
		console.log('Loading tutorial...');
		$('#welcome-agent').modal();
		audioPlayer('transmission');
		newMission('Tutorial Mission: Select this mission to accomplish it.');
		newMission('Tutorial Mission: Select the "+" sign to add new missions.');
		newMission('Tutorial Mission: Accomplish all missions to complete the Operation.');
		newOperation();
		writeToLocal('initialSetup', 'true')
	}
	
}
	
	
function assignAgentName(){
	if (readFromLocal('agent')== null){
		//console.log('assigning agent name...');
		shuffle(agentNames);
		agentName = agentNames[0];
		writeToLocal('agent', agentName);
	} else {
		agentName = readFromLocal('agent');	
	}
	$('.agent-name').html(agentName);
};



function assignTheme(){
	
}

	
	

	


	
/* 	ToDo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


function listMissions(){
	console.log('listing missions...');
		
	var theList = $('#mission-list');
	theList.html('');
	
	if (readFromLocal('missions') != null && readFromLocal('missions')[0] != null ){
		// when the local storage vale 'missions' exists, and it has a lnegth greater than 1. 
		missions = readFromLocal('missions');
		console.log('updating missions array from local storage...');
		$.each( missions, function() {
			var newLI = $('<li>');
				newLI.attr('class', 'mission');
				newLI.attr('id','mission-'+this.id);
				
			var missionText = $('<span>');
				missionText.append(this.text);
				missionText.attr('class', 'mission-text');
				
			newLI.append(missionText);
			/*
			var accomplish = $('<a>');
				accomplish.append('Accomplish');
				accomplish.attr('class','btn btn-default accomplish');
				accomplish.attr('href','#');
			newLI.append(accomplish);
			/**/
			theList.append(newLI);
		});
		
		$('.mission-text').each(function(){
			$(this).on('click', function(){
				var missionId = $(this).parents('li').attr('id');
				var missionIdNumber = eval(missionId.replace('mission-',''));	
				deleteMission(missionIdNumber);
			});
		});
		drawOperation();
	} else {
		console.log('no missions exist in local storage...');
		newOperation();
		
	}
	
}// end list missions	

function drawOperation(){
	// when values exist for these in the local, then change the title, add the classes, as appropriate. 
	var currentOperation = readFromLocal('operation');
	var currentColor = readFromLocal('color');
	var currentShape = readFromLocal('shape');
	if (currentOperation != null && currentColor!= null && currentShape != null){
		console.log('Operation, color, and shape found. Applying to list...');
		$('body').attr('class', currentShape+' '+currentColor);
		$('.operation').html(currentOperation);
	}
	
	
};

function newOperation(){
	console.log('new operation...');
	// reset the operation values. 
	writeToLocal('operation', null);
	writeToLocal('color', null);
	writeToLocal('shape', null);
	
	operationsAdjective = [
		'Robust',
		'Valiant',
		'Burning',
		'Iron',
		'Steel',
		'Titanium',
		'Stalwart',
		'Mighty',
		'Fearless',
		'Resolute',
		'Stout',
		'Daring',
		'Intrepid',
		'Bright',
		'Golden',
		'Brilliant',
		'Vivid',
		'Righteous',
		'Virtuous',
		'Just',
		'Noble', 
		'Bold',
		'Fearless',
		'Enduring',
		'Indomitable',
		'Unstoppable',
		'Tenacious',
		'Unrelenting'
		];
	operationsNoun = [
		'Phone',
		'Headphones',
		'Coffee',
		'Tea',
		'Whiteboard',
		'Earbuds',
		'Paperclip',
		'Ink Cartridge',
		'Water Cooler',
		'Elevator',
		'Keyboard',
		'Highlighter',
		'Pencil',
		'Pen',
		'Notepad',
		'Corkboard',
		'Stairwell',
		'Rubber Band',
		'Pushpin',
		'Waste Basket',
		'Scissors',
		'Stapler',
		'Calculator',
		'Hole Punch',
		'Folder',
		'Cubicle',
		'Copier',
		'Printer',
		'Office',
		'Fax Machine',
		'Conference Room',
		'Rolling Chair',
		'Mailbox',
		'Marker',
		'Mousepad',
		'Stress Ball',
		'Umbrella',
		'Projector',
		'Water Bottle',
		'Mug',
		'Microwave',
		'Refridgerator',
		'Sink',
		'Paper Shredder',
		'Portable Heater',
		'Scanner',
		'AA Battery',
		'Power Strip',
		'USB Drive'
		];
	
	//console.log('creating new operation name...');
	// grab the next random words. 
	shuffle(operationsAdjective);
	shuffle(operationsNoun);
	var adj = operationsAdjective[0];
	var noun = operationsNoun[0];
	// assign them as the operation Name
	operation = adj+' '+noun;
	writeToLocal('operation', operation);
		
	// generate a shape.
	shuffle(shapes);
	writeToLocal('shape', shapes[0]);
	
	// generate a shape.
	shuffle(colors);
	writeToLocal('color', colors[0]);
	
	shuffle(priorityMissions);
	var priority = priorityMissions[0];
	newMission(priority);	
	listMissions();
}


function newMission(text){
	console.log('creating new mission...');
	// create mission object
	var theMission = {
		id:missionCounter, 
		text:text,
		}
	// add object to missions[]
	//console.log('missions originally: '+missions);
	missions.push(theMission);
	//console.log('missions updated to: '+missions);
	writeToLocal('missions', missions);
	
	missionCounter++;
}

function deleteMission(missionNum){
	console.log('deleting mission...');
	
	
	
	
	$.each( missions, function( key, value ) {
		if (this.id == missionNum) {
			missions.splice(key,1);
		}
		writeToLocal('missions', missions);
	});

	if (missions.length == 0){	
		console.log('that was the last mission...');
		$('#operation-complete').modal();
		
	} else {
		console.log('not the last mission, so redraw the list...');
		
		 audioPlayer('accomplished');
      
		
		// trigger the mission accomplished animation. 
		
		
		// fade out the mission
		$('#mission-'+missionNum+' .mission-text').fadeOut(550,'linear', function(){
			$('#mission-'+missionNum).append('<span class="mission-accomplished">Mission ACCOMPLISHED.</span>');
		});
	
	}
		
	console.log('missions updated to: '+missions);
}

function toggleAddMission(){
	var label = $('#toggle-add-mission').html();
	if (label == '+') {
		$('#toggle-add-mission').html('+');
	} else {
		$('#toggle-add-mission').html('-');
	}
	$('#add-mission-form').toggle();
};
	
function audioPlayer(filename){

 var audio = $('<audio>');
 	audio.attr('id', 'audio-'+filename)
	//audio.attr('controls', 'controls');

 
 	/*
	var ogg = $('<source>');
		ogg.attr('type', 'audio/ogg');
		ogg.attr('src', 'audio/'+filename+'.ogg');
	*/	
	var aac = $('<source>');
		aac.attr('type', 'audio/ogg');
		aac.attr('src', 'audio/'+filename+'.wav');
	
	console.log('building audio tag...');
	audio.append(aac);	
	console.log('adding audio to body...');
	
	$('body').append(audio);
	console.log('playing audio...');
	var theSound = document.getElementById('audio-'+filename);
	
	theSound.addEventListener("ended", function () {
		console.log('audio ended: '+this);
		$(theSound).remove();
	}, false);
	
	theSound.play();
	
	
	/*
	
	
	*/
	
}
	
/* 	GO
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


loading();	
	
$( window ).load(function() {
	
setTimeout(function(){
		console.log('fake load over... begin setup');
		setup();
	}, 3700 );
});

//$('#audio-accomplished').play();
//document.getElementById('audio-accomplished').play();

$('#toggle-add-mission').click(function(e){
	e.preventDefault();
	toggleAddMission();
});

$('#add-mission').on('click',(function(e){
	e.preventDefault();
	audioPlayer('click');
	var text = $('#new-mission').val();
	if (text != '') {
		//console.log('adding mission...');
		newMission(text);
		listMissions();
		$('#new-mission').val('');
	}
}));

$('#reset-local').on('click', function(e){
	e.preventDefault();
	console.log('resetting app...');
	localStorage.clear();
	location.reload();
});

$('#operation-complete').on('show.bs.modal', function (e) {
	audioPlayer('transmission');
});
$('#operation-complete').on('hidden.bs.modal', function (e) {
	console.log('Modal hidden...');
	listMissions();
});


$('#welcome-agent').on('hidden.bs.modal', function (e) {
	console.log('Tutorial briefing complete...');
	listMissions();
});


});
// These functions fire only after all the assets have loaded (imgs, etc.)
