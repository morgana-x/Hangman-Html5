const canvas = document.
	querySelector('canvas')
const c = canvas.getContext('2d')
const currentInput = {
	x:0,
	y:0
}
wordpool = ["test", "cheese", "helloworld"]
//const keyboardEventKeyDown = new KeyboardEvent('keydown')
//const keyboardEventKeyUp = new KeyboardEvent('keyup')
canvas.width = innerWidth
canvas.height = innerHeight
guessedWord = ""
randomWord = ""
failedTries = 0
failedLetters = ""
triedLetters = ""
correctLetters = ""
gameOver = 0
maxFail = 10
function isInString(s, t){
	splitLIst = s.split("")
    splitLIst.forEach ((x)=>
	{
		if (x.charCodeAt(0) == t.charCodeAt(0))
		{
			console.log("x == t")
            return true;
		}
		console.log( "." + x.charCodeAt(0)  + "==" + t.charCodeAt(0) + "?")
       
	})
    return false;
}
function refreshGuessedWord()
{
    guessedWord = "";
	splitList = randomWord.split('')
    splitList.forEach((x)=> {
        if (correctLetters.includes(x))
		{
            guessedWord = guessedWord + x;
			return;
		}
        else if ( x == " ")
		{
            guessedWord = guessedWord + " ";
			return;
		}
        else
		{
            guessedWord = guessedWord + "_";
			return;
		}
	
	})
}
function tryInput(letter)
{

	if (letter.length > 1)
	{
		return;
	}
	if (letter == " ")
	{
		return;
	}
	letter = letter.toLowerCase();
	if ((triedLetters.includes(letter)))
	{
		console.log("Already using " + letter)
		return;
	}
	if ((randomWord.includes(letter)))
	{
		console.log("Found letter: " + letter)
		correctLetters = correctLetters + letter;
		triedLetters = triedLetters + letter;
		refreshGuessedWord();
		return;
	}
	failedLetters = failedLetters + (letter);
	triedLetters = triedLetters + (letter);
	failedTries = failedTries + 1;
}
function restart(){
	triedLetters = "";
	failedLetters = "";
	correctLetters = "";
	failedTries = 0;
	gameOver = 0;
	randomWord = wordpool[ Math.floor(Math.random() *(wordpool.length))];
	refreshGuessedWord();
}
function draw() {
	c.fillStyle = "rgb(0,0,0)"
	c.fillRect(0, 0, canvas.width, canvas.height)
	c.fillStyle = "rgb(255,255,255)"
	c.font = 90 + "px Arial";
	c.textAlign = "center"
	c.fillText(guessedWord, canvas.width/2, canvas.height/2)
	c.font = 30 + "px Arial";
	//c.fillStyle = "rgb(0,255,0)"
	//c.fillText(correctLetters, canvas.width/2, canvas.height/3)
	c.fillStyle = "rgb(255,0,0)"
	c.fillText(failedLetters, canvas.width/2, canvas.height/4)
	c.fillStyle = "rgb(255,255,255)"
	c.fillText( failedTries.toString() + "/" + maxFail.toString(), canvas.width /2, canvas.height/5 )
	c.font = 90 + "px Arial";
	if (gameOver == 1)
	{
		c.fillStyle = "rgb(255,0,0)"
		c.fillText("You lose!", canvas.width/2, canvas.height/3)
	}
	if (gameOver == 2)
	{
		c.fillStyle = "rgb(0,255,0)"
		c.fillText("You win!", canvas.width/2, canvas.height/3)
	}
}
function update() {
	
	if (guessedWord == randomWord)
	{
		gameOver = 2
	}
	
	if (failedTries >= maxFail)
	{
		gameOver = 1
	}
	//tryInput(input("Type a letter: "))
}
function animate() {
	animationId = requestAnimationFrame(animate)
	if (gameOver == 0)
	{
		update()
	}
	draw()
}
window.addEventListener('click', ()=> {
//	const angle = Math.atan2(
//		event.clientY - player.y,
//		event.clientX - player.x
	//)

})
window.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;
	if (gameOver > 0)
	{
		restart();
		return;
	}
	tryInput(keyName)
  },
  false,
);
window.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
  },
  false,
);
c.fillStyle = 'rgba(0,0,0,1)'
c.fillRect(0,0,canvas.width,canvas.height)
restart()
animate()