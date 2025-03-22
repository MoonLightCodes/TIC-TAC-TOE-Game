const start = document.getElementById('start');
const root = document.querySelector('#form');
const turn = document.querySelector('#turn');
const gamecon = document.querySelector('#game-cont');
const reset = document.querySelector('#reset');
const msg = document.querySelector('#msg');
let isOver= false;

let player1 = '';
let player2 = '';
let player1Turn = false;
start.onclick = (event) => {
    event.preventDefault();

    // Retrieve player names
    player1 = document.getElementById('player1').value.trim();
    player2 = document.getElementById('player2').value.trim();

    // Validate inputs
    if (player1 === '' || player2 === '') {
        msg.innerText = 'Please enter both player names';
        return;
    }
	gamecon.innerHTML ='';
	gameInit();
};
function gameInit() {
	isOver = false;
	player1Turn = false;
	reset.style.display='none';
	gamecon.classList.add('g');
	gamecon.innerHTML ='';
	msg.innerText = '';
	for(let i =0;i<9;i++){
		let e = document.createElement('div');
		e.classList.add('g-b');
		gamecon.appendChild(e);
	}
	turn.innerText = player1Turn ? `${player1}, you're up` : `${player2}, you're up`;
}
gamecon.addEventListener('click', (e) => {
    if (!e.target.classList.contains('g-b') || e.target.innerText !== ''||isOver) return;
    e.target.innerText = player1Turn ? 'X' : 'O';
    gameOver(e);
    player1Turn = !player1Turn;
    turn.innerText = player1Turn ? `${player1}, you're up` : `${player2}, you're up`;
});

function gameOver(t) {
	let ar = document.querySelectorAll('.g-b');
	let isFilled = true;
	const pat = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];
	pat.forEach((e)=>{
		let [p,q,r]=e;
		let mat = player1Turn?'X':'O';
		if(ar[p].innerText===mat&&ar[q].innerText===mat&&ar[r].innerText===mat){
			turn.innerText = player1Turn ? `${player2}, you're up` : `${player1}, you're up`;
			ar[p].classList.replace('g-b','g-a');
			ar[q].classList.replace('g-b','g-a');
			ar[r].classList.replace('g-b','g-a');
			const ss = document.styleSheets[0];
			ss.insertRule('.g-b:hover{background-color: #a5f5f5;}',ss.cssRules.length);
			isOver = true;
		}
	});
	ar.forEach((e)=>{
		if(e.innerText==='')isFilled= false;
	});

	if(isOver){
		msg.innerText=`Congratulation ${player1Turn?player1:player2} you have won!!`;
		reset.style.display='block';
		reset.onclick=gameInit;
		return;
	}
	if(isFilled){
		msg.innerText=`It's a draw!!`;
		reset.style.display='block';
		reset.onclick=gameInit;
		return;
	}

}
