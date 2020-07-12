// VARIABLES DECLARATION
let clock = document.querySelector("#clock");
let themeToggle = document.querySelector("#theme-toggle");
let theme = true; 
let clearButton = document.querySelector("#clear");
let robbiePic = document.querySelector("#robbie-img");
let robbieName = document.querySelector("#robbie-name");
let robbieContact = document.querySelector("#robbie-contact");
robbieContact.style.display = "none";
let conversation = document.querySelector("#conv");
let textToConvert = document.querySelector("#text-to-convert");
let send = document.querySelector("#send-button");



// CURRENT TIME
function setClock () {
	const currentDate = new Date();
	const currentHours = currentDate.getHours();
	const currentMinutes = currentDate.getMinutes();
	if (currentMinutes < 10) {
		clock.innerHTML = currentHours + ":0" + currentMinutes;
	} else {
		clock.innerHTML = currentHours + ":" + currentMinutes;
	}
}
setInterval(setClock, 1);


// LIGHT / DARK MODES 
function toggleTheme() {
	if (theme) {
		themeToggle.innerHTML = 'Mode: <i class="fas fa-moon" aria-hidden="true"></i>';
		theme = false;
		document.body.classList.add("dark");
	} else {
		themeToggle.innerHTML = 'Mode: <i class="fas fa-sun" aria-hidden="true"></i>';
		theme = true;
		document.body.classList.remove("dark");
	}
}


// NEW MESSAGE TO CONVERT
function newMessage () {
	let newMessage = document.createElement("div");
	newMessage.classList.add("your-answer");
	newMessage.innerHTML = textToConvert.value;
	conversation.prepend(newMessage);
	textToConvert.value = "";
}


// NEW ANSWER FROM ROBBIE
function newAnswer (answer) {
	let newAnswer = document.createElement("div");
	newAnswer.classList.add("robbie-answer");
	newAnswer.classList.add("loading");
	newAnswer.innerHTML = "...";
	setTimeout(function(){
		conversation.prepend(newAnswer); // AVEC CLASSE POUR LES POINTS
		setTimeout(function(){
			newAnswer.classList.remove("loading");
			newAnswer.innerHTML = answer;
		},  1700);
	}, 500);
	
}


// CONVERT A NEW MESSAGE
function convert () {
	if (textToConvert.value !== "") {
	let text = textToConvert.value;
	let binary = "";
	
	binary = text.split("").map(char => {
		return char.charCodeAt(0).toString(2);
	}).join(" ");
	
	newMessage();
	
	newAnswer(binary);

	} else {
		return;
	}
}


// SHOW ROBBIE'S CONTACT
function showContact() {
	if (robbieContact.style.display == "none"){
		robbieContact.style.display = "flex";
	} else {
		robbieContact.style.display = "none";
	}
}



// EVENT LISTENERS
send.addEventListener("click", e => {
	e.preventDefault();
	convert();
});
document.addEventListener("keydown", e => {
	if (textToConvert.value !== "") {
		if (e.keyCode === 13) {
			e.preventDefault();
			convert();
		}
	} 
})
robbiePic.addEventListener("click", showContact);
robbieName.addEventListener("click", showContact);
themeToggle.addEventListener("click", toggleTheme);
clearButton.addEventListener("click", () => {
	conversation.innerHTML = '<div class="robbie-answer"><p>Hi! I am Robbie, your personnal translator. Type anything you want and I\'ll translate into Binary Code. I\'m ready!</p></div>';
})
