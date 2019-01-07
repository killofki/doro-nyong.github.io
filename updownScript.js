{ 
/// 

let answer; 
let guess; 
let turn = 0; 
let gameStart = false; 
let postposition; // ? 

const queryBtn = $( '#query' ); 
const msg = $( '#msg' ); 
const atc = $( 'article'); 
const inpt = $( 'input' ); 
const msgAbove = $( '#message-above' ); 
const rst = $( '#result' ); 
const msgBelow = $( '#message-below' ); 
const objects = { queryBtn, msg, stc, inpt, msgAbove, rst, msgBelow }; 

function $( q ) { return document .querySelector( q ); } 

let initGameEventHandler = queryBtn. addEventListener( "click", btnHandler ); 

function fadeIn( sth ) { 
	fadeTime( sth, { add : 'active' }, 20, { add : 'show' } ); 
	} 

function fadeOut( sth ) { 
	fadeTime( sth, { remove : 'show' }, 200, { remove : 'active' } ); 
	} 

function fadeTime( obj, preCmd, delay, timeoutCmd ) { 
	classCmd( sth, preCmd ); 
	setTimeout( q => classCmd( sth, timeoutCmd ), 200 ); 
	} 

function btnHandler() { 
	  gameStart ? ( 
		  guess = parseInt( inpt .value ) 
		, ( isNaN( guess ) || guess < 1 || guess > 100 ) ? 
			( msg .innerHTML = "1부터 100까지의 숫자 중 하나를 입력해주세요!" ) 
		: ( inpt .value = "", answering( guess ) ) 
	: initializeGame() 
		; 
	} 

function initializeGame() { 
	fadeOut( atc ); 
	turn = 0; 
	classCmd( queryBtn, { add : 'deactivated' }, '기다리세요!' ); 
	msg .innerHTML = "1부터 100까지의 숫자 중 하나를 생각하는 중입니다…"; 
	
	answer = Math .floor( Math .random() * 100 ) + 1; 
	setTimeout( startGame, 1000 ); 
	} 

function startGame() { 
	classCmd( queryBtn, { remove : 'deactivated' }, '추측하기' ); 
	objectsNhtml( objects, { 
		  msg : "텍스트 창에 추측한 숫자를 입력하고 버튼을 눌려주세요." 
		, msgAbove : "1번째 시도입니다." 
		, msgBelow : "" 
		, rst : "？" 
		} ); 
	
	[ atc, inpt ] .forEach( fadeIn ); 
	gameStart = true; 
	
	inpt .onkeydown = ({ keyCode }) => { keyCode === 13 && btnHandler(); }; 
	} 

function classCmd( obj, cmdobj, ... ar ) { 
	Object .keys( cmdobj ) .forEach( p => 
		obj .classList[ p ]( cmdobj[ p ] ) 
		); 
	ar .length && ( [ obj .innerHTML ] = ar ); 
	} 

function answering( num ) { 
	  num === "" ? 'what?' 
	: answer === num ? result( true, num ) 
	: answer > num ? result( 'up', num ) 
	: result( 'down', num ) 
		; 
	} 

function turnPass() { 
	turn += 1; 
	msgAbove .innerHTML = `${ turn }번째 시도입니다.`; 
	} 

function result( judge, num ) { 
	if ( judge === true ) { 
		classNhtml( rst, { 
			  className : '' 
			, innerHTML : answer 
			} ); 
		msgBelow .innerHTML = `정답은 ${ answer }입니다!`; 
		
		gameStart = false; 
		objectsNhtml( objects 
			, { queryBtn : '디시하기' } 
			, { msg : '게임을 다시 시작하려면 위의 버튼을 눌러주세요.' } 
			); 
		fadeOut( inpt ); 
		} 
	else { 
		turnPass(); 
		classNhtml( rst, { 
			  className : `result-${ judge }` 
			, innerHTML : judge .toUpperCase() 
			} ); 
		msgBelow .innerHTML = `${ guess }${ choosePostposition( num ) } 아닙니다!` 
		} 
	} 

function classNhtml( obj, { className, innerHTML } ) { 
	Object .assign( obj, { className }, { innerHTML } ); 
	} 

function objectsNhtml( objs, ... orders ) { 
	orders .forEach( cmdobj => Object .keys( cmdobj ) .forEach( p => 
		objs[ p ] .innerHTML = cmdobj[ p ] 
		) ); 
	} 

function choosePostposition( number ) { 
	noun = parseInt( number ) % 10; 
	return [ 2, 4, 5, 9 ] .some( n => n === noun ) ? '가' : '이'; 
	} 

// src from https://doro-nyong.github.io/up-and-down-js/ 
/// 
} 