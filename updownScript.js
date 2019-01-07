{ 
/// 

let answer; 
let guess; 
let turn = 0; 
let gameStart = false; 
let postposition; 

const queryBtn = $( '#query' ); 
const msg = $( '#msg' ); 
const atc = $( 'article'); 
const inpt = $( 'input' ); 
const msgAbove = $( '#message-above' ); 
const rst = $( '#result' ); 
const msgBelow = $( '#message-below' ); 

function $( q ) { return document .querySelector( q ); } 

let initGameEventHandler = queryBtn. addEventListener( "click", btnHandler ); 

function fadeIn(sth) { 
	sth .classList .add( "active" ); 
	setTimeout( q => { sth .classList .add( "show" ) }, 20 ); 
	} 

function fadeOut(sth) { 
	sth .classList .remove( "show" ); 
	setTimeout( q => { sth .classList .remove( "active" ) }, 200 ); 
	} 

function btnHandler() { 
	if ( gameStart ) { 
		guess = parseInt( inpt .value ); 
		
		if ( isNaN( guess ) || guess < 1 || guess > 100 ) { 
			msg .innerHTML = "1부터 100까지의 숫자 중 하나를 입력해주세요!"; 
			} 
		else { 
			inpt.value = ""; 
			answering( guess ); 
			} 
		} 
	else { 
		initializeGame(); 
		} 
	} 

function initializeGame() { 
	fadeOut( atc ); 
	turn = 0; 
	queryBtn .classList .add( "deactivated" ); 
	queryBtn .innerHTML = "기다리세요!"; 
	msg .innerHTML = "1부터 100까지의 숫자 중 하나를 생각하는 중입니다…"; 
	
	answer = Math .floor( Math .random() * 100 ) + 1; 
	setTimeout( startGame, 1000 ); 
	} 

function startGame() { 
	queryBtn .classList .remove( "deactivated" ); 
	queryBtn .innerHTML = "추측하기"; 
	msg .innerHTML = "텍스트 창에 추측한 숫자를 입력하고 버튼을 눌려주세요."; 
	msgAbove .innerHTML = "1번째 시도입니다."; 
	msgBelow	.innerHTML = ""; 
	rst .innerHTML = "？"; 
	
	fadeIn( atc ); 
	fadeIn( inpt ); 
	gameStart = true; 
	
	inpt .onkeydown = ({ keyCode }) => { 
		if ( keyCode === 13 ) { 
			btnHandler(); 
			} 
		}; 
	} 

function answering( num ) { 
	if ( num === "" ) { 
		return; 
		} 
	else { 
		if ( answer === num ) { 
			result( true, num ); 
			} 
		else if (answer > num) { 
			result( 'up', num ); 
			} 
		else { 
			result( 'down', num ); 
			} 
		} 
	} 

function turnPass() { 
	turn++; 
	msgAbove .innerHTML = turn .toString() + "번째 시도입니다."; 
	} 

function result( judge, num ) { 
	if ( judge === true ) { 
		rst .className = ""; 
		rst .innerHTML = answer; 
		msgBelow .innerHTML = "정답은 " + answer + "입니다!"; 
		
		gameStart = false; 
		queryBtn .innerHTML = "다시 하기"; 
		msg .innerHTML = "게임을 다시 시작하려면 위의 버튼을 눌러주세요."; 
		fadeOut( inpt ); 
		} 
	else { 
		turnPass(); 
		rst .className = "result-" + judge; 
		rst .innerHTML = judge .toUpperCase(); 
		msgBelow .innerHTML = guess + choosePostposition( num ) + " 아닙니다!" 
		} 
	} 

function choosePostposition( number ) { 
	noun = parseInt( number ) % 10; 
	if ( noun === 2 || noun === 4 || noun === 5 || noun === 9 ) { 
		return "가"; 
		} 
	else { 
		return "이"; 
		} 
	} 

// src from https://doro-nyong.github.io/up-and-down-js/ 
/// 
} 