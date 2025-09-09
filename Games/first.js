// Game state
let userScore = 0;
let computerScore = 0;

// Elements
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const msgEl = document.getElementById("msg");
const choices = Array.from(document.querySelectorAll(".choice"));

const CHOICES = ["rock", "paper", "scissors"];

function getComputerChoice() {
	const index = Math.floor(Math.random() * CHOICES.length);
	return CHOICES[index];
}

function determineResult(userChoice, compChoice) {
	if (userChoice === compChoice) return "draw";
	if (
		(userChoice === "rock" && compChoice === "scissors") ||
		(userChoice === "paper" && compChoice === "rock") ||
		(userChoice === "scissors" && compChoice === "paper")
	) {
		return "win";
	}
	return "lose";
}

function updateScores(result) {
	if (result === "win") {
		userScore += 1;
		userScoreEl.textContent = String(userScore);
	} else if (result === "lose") {
		computerScore += 1;
		compScoreEl.textContent = String(computerScore);
	}
}

function clearMsgState() {
	msgEl.classList.remove("msg-win", "msg-lose", "msg-draw");
}

function setMsg(text, result) {
	clearMsgState();
	msgEl.textContent = text;
	if (result === "win") msgEl.classList.add("msg-win");
	if (result === "lose") msgEl.classList.add("msg-lose");
	if (result === "draw") msgEl.classList.add("msg-draw");
}

function highlightChoices(userChoice, compChoice, result) {
	choices.forEach((el) => el.classList.remove(
		"selected-win",
		"selected-lose",
		"selected-draw"
	));
	const userEl = document.getElementById(userChoice);
	const compEl = document.getElementById(compChoice);
	const cls = result === "win" ? "selected-win" : result === "lose" ? "selected-lose" : "selected-draw";
	if (userEl) userEl.classList.add(cls);
	if (compEl) compEl.classList.add(cls);
	setTimeout(() => {
		choices.forEach((el) => el.classList.remove(
			"selected-win",
			"selected-lose",
			"selected-draw"
		));
	}, 900);
}

let isLocked = false;

function handleUserChoice(userChoice) {
	if (isLocked) return; // prevent rapid double clicks
	isLocked = true;
	const compChoice = getComputerChoice();
	const result = determineResult(userChoice, compChoice);
	updateScores(result);
	const pretty = (s) => s.charAt(0).toUpperCase() + s.slice(1);
	if (result === "win") {
		setMsg(`${pretty(userChoice)} beats ${pretty(compChoice)}. You win!`, "win");
	} else if (result === "lose") {
		setMsg(`${pretty(compChoice)} beats ${pretty(userChoice)}. You lose.`, "lose");
	} else {
		setMsg(`Both chose ${pretty(userChoice)}. It's a draw.`, "draw");
	}
	highlightChoices(userChoice, compChoice, result);
	setTimeout(() => {
		isLocked = false;
	}, 400);
}

// Attach listeners
choices.forEach((choiceEl) => {
	choiceEl.addEventListener("click", () => {
		handleUserChoice(choiceEl.id);
	});
	choiceEl.setAttribute("role", "button");
	choiceEl.setAttribute("tabindex", "0");
	choiceEl.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			 e.preventDefault();
			 handleUserChoice(choiceEl.id);
		}
	});
});

// Initial message
setMsg("Play Your Move", "draw");


