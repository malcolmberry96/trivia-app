var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
//======================
var timer = '';
var qA = {
			1:{
				question:'What is Goku\'s father\'s name?',
				answers:['Bardock','Broly','Vegeta','Goku'],
				correct:'Bardock',
				right: 'Correct!',
				wrong: 'Wrong! Correct Answer: Bardock',
				imageUrl:'assets/images/bardock.gif'
			   },
			2:{
				question:'On what planet was Goku born?',
				answers:['Planet Saiyan','Planet Vegeta','Earth','Namek'],
				correct:'Planet Vegeta',
				right: 'Correct!',
				wrong: 'Thats not right! Correct Answer: Planet Vageta',
				imageUrl:'assets/images/vegeta.gif'
			},
			3:{
				question:'Which character is a Namekian?',
				answers:['Piccolo','Goku','Yamcha','Frieza'],
				correct:'Piccolo',
				right: 'Correct!',
				wrong: 'Wrong! Correct Answer: Piccolo',
				imageUrl:'assets/images/piccolo.gif'
			}

	};
//Functions
var start = function(){
	//When button is clicked clear trivia que
	$('.startBtn').on('click',function(){
		//Empty trivia que to start new question and tally new points
		$('.trivSection').empty();
		createQuestions();
	});
}
//Generate Questionss 
var createQuestions = function(){
	timerStart();
	//Get questions
	var question = qA[qACount]['question'];
	//assign div element to newDiv
	var newDiv = $('<div>');
	//Add a class to newDIv
	newDiv.addClass('question');
	//Add text to question
	newDiv.text(question);
	//Add question to DOM
	$('.trivSection').append(newDiv);
	createAnswers();
}
var createAnswers = function(){
	var answerLength = qA[qACount]['answers'].length;
	for(var i = 0; i < answerLength;i++){
		//get answers
		var answers = qA[qACount]['answers'][i];
		//Create new div to hold answers
		var newBtn = $('<button>');
		//Add class to new Div
		newBtn.addClass('answers redBtn');
		//Give buttons attribute
		newBtn.attr('data-type',answers);
		//add text to new Div
		newBtn.text(answers);
		//Add answers to DOM
		$('.trivSection').append(newBtn);
	}
	//Prevents click event from being saved
	$(document).off('click','.answers',checkAnswer);
	$(document).on('click','.answers',checkAnswer);
}
var checkAnswer = function(){
	 //Get users answer choice
	var userAnswer = $(this).data('type');
	var correctAnswer = qA[qACount]['correct'];
	var correctImg = qA[qACount]['imageUrl'];

	var right = qA[qACount]['right'];
	var wrong = qA[qACount]['wrong'];
	console.log(qACount);
	if(userAnswer === correctAnswer){
		//Update rightCount
		rightCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		//Create Div
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('rightAnswer');
		//adds CORRECT! text to div
		newDiv.text(right);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		if(qACount <= 3){
			//removes CORRECT! text and continues to create next question after 3 seconds
			setTimeout(
				function(){
					$('.trivSection').empty();
					createQuestions();
					},3500);
		}
		else{
			$('.trivSection').empty();
			var newImg = $('<img>');
			newImg.attr('src',correctImg);
			$('.trivSection').append(newImg);
			//Create Div
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('rightAnswer');
			//adds CORRECT! text to div
			newDiv.text(right);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer)
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
	else{
		wrongCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('wrongAnswer');
		//adds Wrong! text to div
		newDiv.text(wrong);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		
		if(qACount <= 3){
			setTimeout(function(){
			$('.trivSection').empty();
			createQuestions();
			},3500);
		}
		else{
			//Clears out triv Section
			$('.trivSection').empty();
			var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('wrongAnswer');
			//adds Wrong! text to div
			newDiv.text(wrong);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer);
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
}
//Timer
//==========================================
var timerStart = function(){ 
	$('.timerSection').empty();
	//Sets time to 10
	trivTime = 100;
	//Progress Bar
	var timeTag = $('<div>');
	timeTag.addClass('time');
	timeTag.addClass('progress');
	var progressBar = $('<div>');
	progressBar.addClass('progress-bar');
	progressBar.width(trivTime + '%');

	$('.timerSection').append(timeTag);
	$('.time').append(progressBar);	
	//Decrements Time
	timer = setInterval(timeDecrement,100);
}
var timeDecrement = function(){ 
	//Progress bar decrement
	$('.progress-bar').width(trivTime + '%');
	trivTime--;
	//if time gets to 0 user loses
	if(trivTime === -10){
		userAnswer = false;
		//Clears Time
		clearInterval(timer);
		checkAnswer();
	}
	
}
var gameOver = function(){
	//Remove everything in trivia section
	$('.trivSection').empty();
	//Remove everthing in timer section
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
	$('.trivSection').append(scoreDiv);
	//Assign new div element to new Div
	var newDiv = $('<div>');
	//add class to new Div
	newDiv.addClass('gameOver');
	//add game over text
	newDiv.text('Game Over! Play Again ?');
	//Append game over text to DOM
	$('.trivSection').append(newDiv);
	//Create ResetButton
	var newBtn = $('<button>');
	//Give btn Class
	newBtn.addClass('redBtn resetBtn');
	//Give btn reset Text
	newBtn.text('Reset');
	//Append
	$('.trivSection').append(newBtn);
	//Reset all value
	trivTime = 100;
	qACount = 1;
	rightCount = 0;
	wrongCount = 0;
	//Restart when the reset button is clicked
	$('.resetBtn').on('click',function(){
		$('.trivSection').empty()
		//Starts game over
		createQuestions();
	});
}

/*Main
==============================================================*/
start();



