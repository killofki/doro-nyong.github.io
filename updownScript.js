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
const objects = { queryBtn, msg, atc, inpt, msgAbove, rst, msgBelow }; 

function $( q ) { return document .querySelector( q ); } 

let initGameEventHandler = queryBtn .addEventListener( "click", btnHandler ); 

function fadeIn( sth ) { 
	fadeTime( sth, { add : 'active' } 
		, [ 20, { add : 'show' } ] 
		); 
	} 

function fadeOut( sth ) { 
	fadeTime( sth, { remove : 'show' } 
		, [ 200, { remove : 'active' } ] 
		); 
	} 

async function fadeTime( obj, preCmd, ... delayCmds ) { 
	classCmd( obj, preCmd ); 
	for ( [ delay, timeoutCmd ] of delayCmds ) { 
		await sleep( delay ); 
		classCmd( obj, timeoutCmd ); 
		} 
	} 

function sleep( delay ) { return new Promise( res => setTimeout( q => res(), delay ) ); } 

function btnHandler() { 
	  gameStart ? ( 
		  guess = parseInt( inpt .value ) 
		, ( isNaN( guess ) || guess < 1 || guess > 100 ) ? 
			objectsNhtml( objects, { msg : "1부터 100까지의 숫자 중 하나를 입력해주세요!" } ) 
		: ( inpt .value = "", answering( guess ) ) 
		) 
	: initializeGame() 
		; 
	} 

function initializeGame() { 
	fadeOut( atc ); 
	turn = 0; 
	classCmd( queryBtn, { add : 'deactivated' } ); 
	objectsNhtml( objects, { 
		  queryBtn : '기다리세요!' 
		, msg : "1부터 100까지의 숫자 중 하나를 생각하는 중입니다…" 
		} ); 
	
	answer = Math .floor( Math .random() * 100 ) + 1; 
	setTimeout( startGame, 1000 ); 
	} 

function startGame() { 
	classCmd( queryBtn, { remove : 'deactivated' } ); 
	objectsNhtml( objects, { 
		  queryBtn : '추측하기' 
		, msg : "텍스트 창에 추측한 숫자를 입력하고 버튼을 눌려주세요." 
		, msgAbove : "1번째 시도입니다." 
		, msgBelow : "" 
		, rst : "？" 
		} ); 
	
	[ atc, inpt ] .forEach( fadeIn ); 
	gameStart = true; 
	
	inpt .onkeydown = ({ keyCode }) => { keyCode === 13 && btnHandler(); }; 
	} 

function classCmd( obj, cmdobj ) { Object .keys( cmdobj ) .forEach( p => 
	obj .classList[ p ]( cmdobj[ p ] ) 
	); } 

function answering( num ) { 
	  num === "" ? 'what?' // throw error..? 
	: answer === num ? result( true, num ) 
	: answer > num ? result( 'up', num ) 
	: result( 'down', num ) 
		; 
	} 

function turnPass() { 
	turn += 1; 
	objectsNhtml( objects, { msgAbove : `${ turn }번째 시도입니다.` } ); 
	} 

function result( judge, num ) { 
	if ( judge === true ) { 
		rst .className = ''; 
		objectsNhtml( objects 
			, { rst : answer } 
			, { msgBelow : `정답은 ${ answer }입니다!` } 
			); 
		
		gameStart = false; 
		objectsNhtml( objects 
			, { queryBtn : '다시하기' } 
			, { msg : '게임을 다시 시작하려면 위의 버튼을 눌러주세요.' } 
			); 
		fadeOut( inpt ); 
		} 
	else { 
		turnPass(); 
		rst .className = `result-${ judge }`; 
		objectsNhtml( objects 
			, { rst : judge .toUpperCase() } 
			, { msgBelow : `${ guess }${ choosePostposition( num ) } 아닙니다!` } 
			);  
		} 
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