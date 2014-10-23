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
	'roundrects',
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

var patterns = [
	'big3',
	'corner-grid', 
	'lines',
	'grid'/*,
	'triple-row',
	'face',
	'bar-stripe',
	'full-grid',
	'lines',
	'inner-pyramid'*/
	]

var priorityMissions = [
	'Priority Mission: Look for a discarded soda can along the sidewalk. Do not approach it. Note the location and time of day, and await further instructions.',
	'Priority Mission: Deliver a coded message. The next woman you see wearing red is our target. Approach her and speak the passphrase "You look nice today." If she says "Thanks" then she has confirmed receipt of the message, and this mission is a success. ',
	'Priority Mission: Infiltrate enemy safehouse. Your best friend is under surveillance by the enemy. You must provide counter-surveillence by shadowing them for no less than 10 minutes wihtout their spotting you.',
	'Priority Mission: Infiltrate enemy safehouse. The shop you visited last is actually a front organization for the enemy. Return to the shop, and count the number of people on shift, and keep it in your records.',
	'Priority Mission: Decrypt this intercepted enemy transmission: "Cf po uif mpplpvu gps xijuf dbut. Xf ibwf sfbtpo up cfmjfwf uifz bsf jo mfbhvf xjui uif fofnz."',
	'Priority Mission: Decrypt this intercepted enemy transmission: "Cfhjo tupdlqjmjoh qfodjmt. Fyqfdu tipsubhft xjuijo uif zfbs."',
	'Priority Mission: Keep up your cover. You must appear to be a civilian. Go to a public place with a friend, and be seen having a good time. If anyone wearing white passes you, be sure to laugh loudly and exclaim how much normal fun you are having.',
	'Priority Mission: Deliver a coded message. Purchase a newspaper. Shortly afterwards you will see a man with a beard. Give him the newspaper, and say "You need to read this. You. Need. To. Read. This."',
	];
/*
var loadingMessages = [
	'Calibrating Frequencies',
	'Bypassing Security Protocols',
	'Initializing Firewall',
	'Securing Hardlink',
	'Crossing Streams'
	];	
*/

windowHeight = $(window).height();
windowWidth = $(window).width();

	
/* 	FUNCTIONS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//window.setInterval($('#loading-message').append('. '),300);	

function loading(){
	$('#loading').show();
	$('.container').hide();
	$('#agent-screen-inner').hide();
	//audioPlayer('loading');
	
	$('#loading').height(windowHeight);
	$('#agent-screen').height(windowHeight);

	
	var loadingHeight = $('#loading-inner').height();
	var loadAdjust = .5*(windowHeight-loadingHeight);
	$('#loading-inner').css('top', loadAdjust+'px');
	
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
		var dotter = window.setInterval(function(){addDot()},200);	
	}
	loadGenerator();
}

function agentScreen(){
	
	// read from, or write to, local storage. set classes. 
	if (readFromLocal('agentColor') == null){
		console.log('no Agent Color found in local...');
		shuffle(colors);
	 	agentColor = colors[0];
		writeToLocal('agentColor', agentColor);
	} else {
		agentColor = readFromLocal('agentColor');
		console.log('found agent color...'+agentColor);
	}
	if (readFromLocal('agentPattern') == null){
		shuffle(patterns);
		var agentPattern = patterns[0];
		writeToLocal('agentPattern', agentPattern);
	} else {
		agentPattern = readFromLocal('agentPattern');
	}
	$('#agent-screen').addClass('agent-'+agentColor);
	$('#agent-screen').addClass('agent-'+agentPattern);
	
	
	
	
	// build html for agent screen. 
	
	function generateShapes(n){
		var shapes = $('<div>');
			shapes.addClass('shapes');	
		for (i=1; i<= n; i++){
			var shape = $('<div>');
				shape.addClass('shape');
			shapes.append(shape);	
		}
		$('#agent-screen-inner').append(shapes);
	}
	function numberShapes(){
		var shapeCount = 1;
		$('.shape').each(function(){
			$(this).attr('id', 'shape'+shapeCount);
			shapeCount++;
		});
	}
	
	
	var currentPattern = readFromLocal('agentPattern');
	if (currentPattern == 'big3'){
		var shapes = generateShapes(3);
		numberShapes()
	}
	if (currentPattern == 'corner-grid'){
		var shapes = generateShapes(15);
		numberShapes();
		var opacity = 1;
		$('.shape').each(function() {
			$(this).css('opacity', opacity);
			opacity = opacity-.05
		});
	}
	if (currentPattern == 'lines'){
		var shapes = generateShapes(11);
		numberShapes();
		$('.shapes').addClass('poop').height(windowHeight);
	}
	if (currentPattern == 'grid'){
		var shapes = generateShapes(30);
		
		// random number between 1-10
		
		//

		numberShapes();
		$('.shape').each(function(){
			var opacity = Math.random()*10;
			opacity = Math.round(opacity);
			$(this).css('opacity', opacity/10);
			
		});
	}
	
	
	// animate
	$('#agent-screen').addClass('agent-move');
	var delay = 2000;
	setTimeout(function(){
		$('#agent-screen-inner').show();
	}, 100 );
	setTimeout(function(){
		$('#agent-screen-inner').hide();
	}, delay-100);
	setTimeout(function(){
		$('#loading').hide();
		$('.container').show();
		$('#agent-screen').addClass('agent-collapse');
		tutorial();
		listMissions();
	}, delay);
	
};

function setup(){
	// main screen fades in, on top of loading screen. 
	
	
	assignAgentName();	
	agentScreen();	
	
	//
	
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
				missionText.attr('class', 'mission-text');
				
			var shape = $('<span>');
				shape.addClass('shape');	
			
			missionText.append(shape);	
			missionText.append(this.text);
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
		$('#app-wrap').attr('class', currentShape+' '+currentColor);
		$('.operation').html(currentOperation);
	}
	
	
};

function newOperation(){
	console.log('new operation...');
	
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
/*
function toggleAddMission(){
	var label = $('#toggle-add-mission').html();
	if (label == '+') {
		$('#toggle-add-mission').html('+');
	} else {
		$('#toggle-add-mission').html('-');
	}
	$('#add-mission-form').toggle();
};
*/
	
function audioPlayer(filename){
console.log('audio playing now...');
 var audio = $('<audio>');
 	audio.attr('id', 'audio-'+filename)
	//audio.attr('controls', 'controls');

	var ogg = $('<source>');
		ogg.attr('type', 'audio/ogg');
		ogg.attr('src', 'audio/'+filename+'.ogg');
	
	var aac = $('<source>');
		aac.attr('type', 'audio/aac');
		aac.attr('src', 'audio/'+filename+'.aac');
	
	console.log('building audio tag...');
	audio.append(aac);	
	audio.append(ogg);	
	
	console.log('adding audio to body...');
	
	$('body').append(audio);
	console.log('playing audio...');
	var theSound = document.getElementById('audio-'+filename);
	
	theSound.addEventListener("ended", function () {
		console.log('audio ended: '+this);
		$(theSound).remove();
	}, false);
	
	$('body').append(theSound);
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
	}, 2500 );
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
