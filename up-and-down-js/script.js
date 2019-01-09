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

let initGameEventHandler = queryBtn .addEventListener( "click", btnHandler ); // just naming.. 

function btnHandler() { 
	gameStart ? receivingTransmission() : initializeGame(); 
	} 

function initializeGame() { 
	fadeOut( atc ); 
	turn = 0; 
	queryBtn .classList .add( 'deactivated' ); 
	objectsNhtml({ 
		  queryBtn : '기다리세요!' 
		, msg : "1부터 100까지의 숫자 중 하나를 생각하는 중입니다…" 
		}); 
	
	doNdelay( q => answer = Math .floor( Math .random() * 100 ) + 1 
		, [ 1000, startGame ] 
		); 
	} 

function startGame() { 
	queryBtn .classList .remove( 'deactivated' ); 
	objectsNhtml({ 
		  queryBtn : '추측하기' 
		, msg : "텍스트 창에 추측한 숫자를 입력하고 버튼을 눌려주세요." 
		, msgAbove : "1번째 시도입니다." 
		, msgBelow : "" 
		, rst : "？" 
		}); 
	
	[ atc, inpt ] .forEach( fadeIn ); 
	gameStart = true; 
	
	inpt .onkeydown = ({ keyCode }) => { keyCode === 13 && btnHandler(); }; 
	} 

function receivingTransmission() { 
	guess = parseInt( inpt .value ); 
	turnPass(); // received 
	  ( ! isNaN( guess ) && guess >= 1 && guess <= 100 ) ? ( inpt .value = '', answering( guess ) ) 
	: objectsNhtml({ msg : "1부터 100까지의 숫자 중 하나를 입력해주세요!" }) 
		; 
	} 

function answering( num ) { result( 
	  [ 'up', true, 'down' ] [ Math .sign( num - answer ) + 1 ] 
	, num 
	); } 

function result( judge, num ) { 
	if ( judge === true ) { 
		rst .className = ''; 
		objectsNhtml({ 
			  rst : answer 
			, msgBelow : `정답은 ${ answer }입니다!` 
			}); 
		
		gameStart = false; 
		objectsNhtml({ 
			  queryBtn : '다시 하기' 
			, msg : '게임을 다시 시작하려면 위의 버튼을 눌러주세요.' 
			}); 
		fadeOut( inpt ); 
		} 
	else { 
		rst .className = `result-${ judge }`; 
		objectsNhtml({ 
			  rst : judge .toUpperCase() 
			, msgBelow : `${ guess }${ choosePostposition( num ) } 아닙니다!` 
			});  
		} 
	} 

function turnPass() { 
	turn += 1; 
	objectsNhtml({ msgAbove : `${ turn }번째 시도입니다.` }); 
	} 

function choosePostposition( number ) { 
	let noun = `${ parseInt( number ) }` .slice( -1 ); 
	return [ ... '2459' ] .some( n => n === noun ) ? '가' : '이'; 
	} 

function fadeIn( sth ) { 
	let { classList } = sth; 
	doNdelay( q => classList .add( 'active' ) 
		, [ 20, q => classList .add( 'show' ) ] 
		); 
	} 

function fadeOut( sth ) { 
	let { classList } = sth; 
	doNdelay( q => classList .remove( 'show' ) 
		, [ 200, q => classList .remove( 'active' ) ] 
		); 
	} 

function objectsNhtml( ... orders ) { 
	orders .forEach( cmdobj => Object .keys( cmdobj ) .forEach( p => 
		objects[ p ] .innerHTML = cmdobj[ p ] 
		) ); 
	} 

async function doNdelay( F, ... delayFs ) { 
	F(); 
	for ( let [ delay, delayF ] of delayFs ) { 
		await sleep( delay ); 
		delayF(); 
		} 
	} 

function sleep( delay ) { return new Promise( res => setTimeout( q => res(), delay ) ); } 

function $( q ) { return document .querySelector( q ); } 

// original from https://doro-nyong.github.io/up-and-down-js/ 
/// 
} 