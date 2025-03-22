const start = document.getElementById('start');
const root = document.querySelector('#form');
const turn = document.querySelector('#turn');
const gamecon = document.querySelector('#game-cont');
const reset = document.querySelector('#reset');
const msg = document.querySelector('#msg');

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
        
        return;
    }
	gamecon.innerHTML ='';
	gameInit();
};
function gameInit() {
	gamecon.classList.add('g');
	gamecon.innerHTML ='';
	for(let i =0;i<9;i++){
		let e = document.createElement('div');
		e.classList.add('g-b');
		gamecon.appendChild(e);
	}
	turn.innerText = player1Turn ? `${player2}, you're up` : `${player1}, you're up`;
}
gamecon.addEventListener('click', (e) => {
    if (!e.target.classList.contains('g-b') || e.target.innerText !== '') return;
    e.target.innerText = player1Turn ? 'X' : 'O';
    turn.innerText = player1Turn ? `${player2}, you're up` : `${player1}, you're up`;
    gameOver(e);
    player1Turn = !player1Turn;
});

function gameOver(t) {
	let ar = document.querySelectorAll('.g-b');
	let isOver= false;
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
			ar[p].classList.add('mat');
			ar[q].classList.add('mat');
			ar[r].classList.add('mat');
			isOver = true;
		}
	});
	ar.forEach((e)=>{
		if(e.innerText==='')isFilled= false;
	});

	if(isOver){
		alert(`Congratulation ${player1Turn?player1:player2} you have won!!`);
		gameInit();
		return;
	}
	if(isFilled){
		//t.target.innerText = mat;
		alert(" Tie Game press okay to re-start");
		gameInit();
		return;
	}

}