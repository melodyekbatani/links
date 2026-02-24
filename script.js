// from class website https://typography-interaction-2526.github.io/topic/javascript/#opening-a-modal and used mdn/claude/youtube to help me put this together. Firstly asked it to explain to me what each thing I'm trying to do is called in javascript then how the synthx works and when it gives me something I alway ask why, how it works or deeper references that i go and look at/watch 

 // currentIndex =-1 is a function that remembers the position of the last block clicked. Starts at -1 meaning nothing clicked yet (the empty disc plate). Updates to that block's number when clicked — so the 5th block = 4 (counting starts at 0). next/back then just add or subtract 1 from this.

// DIALOG
// From class website https://typography-interaction-2526.github.io/topic/javascript/#opening-a-modal
// Setting up variables that point to the HTML elements we need to control.


// Similar to before, setting up variables.
let modalButton = document.querySelector('#modal') // The thing we’re clicking.
let modalDialog = document.querySelector('#dialog') // Now one for our `dialog`.
let closeButton = modalDialog.querySelector('button') // Only looking within `modalDialog`.

modalButton.addEventListener('click', () => { // “Listen” for clicks.
	modalDialog.showModal() // This opens it up.
})

closeButton.addEventListener('click', () => {
	modalDialog.close() // And this closes it!
})

// Listen to *all* clicks, now including the `event` parameter…
document.addEventListener('click', (event) => {
	// Only clicks on the page itself behind the `dialog`.
	if (event.target == document.documentElement) {
		modalDialog.close() // Close it too then.
	}
})
// PAUSE / PLAY

let isPlaying = true // Tracks whether the disc is spinning. Starts as true because the CSS animation runs on load. this is a true/false switch that remembers whether the disc is currently spinning or not. Starts as true because the CSS animation runs on load. The reason I couldn't do this in CSS is because it can't respond to clicks on its own, it has no way to react "when this button is clicked, do this."  JS is what listens for the click and then reaches into the CSS to change the property. So the animation lives in CSS because that's where visual effects belong, but the button interaction has to live in JS because that's the only language that can respond to what a user does. Learnt the below part using Claude and MDN - this is directly controlled using #disc {animation: spin 8s linear infinite animation-play-state: paused; @keyframes spin from { transform: rotate(0deg); } to { transform: rotate(360deg); }

document.querySelector('#pause-play').addEventListener('click', () => {
	let disc = document.querySelector('#disc')
	isPlaying = !isPlaying  // The ! means "not" — so if isPlaying was true it becomes !true = false, and if it was false it becomes !false = true. This flips the value each time the button is clicked so JS always knows the current state of the disc. flip between true and false, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT. This is the the MDN page for the ! operator (called "Logical NOT") — explains exactly how it flips boolean values. 
	disc.style.animationPlayState = isPlaying ? 'running' : 'paused'  // animationPlayState pauses and resumes the spin animation defined in cd.css. // I'm controlling it from JS here because JS is what handles the button click — // it reaches into the CSS and flips the switch depending on isPlaying. // MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
})


// NEXT / BACK 
// I wanted the back and next buttons to navigate through the filmstrip blocks. I worked on this with Claude to understand how to connect the buttons to the blocks, and used MDN to understand the specific methods being used. goToBlock is a reusable function that takes a position number and navigates to that block.

	let goToBlock = (index) => { // I created this as a reusable function so both buttons can call the same logic, just with different numbers passed in.
	let blocks = document.querySelectorAll('#channel-blocks li') // Grabs all filmstrip blocks - similar to whats in the are.na file template


	// I wanted the navigation to loop around — so if you're on the last block and hit next, it goes back to the first, and if you're on the first and hit back it goes to the last. Wrap around at the ends so navigation loops.
	// If we go before the first block, jump to the last. If we go past the last, jump to the first.
	if (index < 0) index = blocks.length - 1
	if (index >= blocks.length) index = 0

	blocks[index].click() // currentIndex lives in arena.js and gets updated by the click listener there. We just need to click the right block — it handles the rest. This clicks the target block, which triggers the click listener. I set up in arena.js — so it calls displayOnDisc and updates currentIndex automatically. I didn't know you could trigger a click in JS until I looked this up 
	// MDN: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click


    blocks[index].scrollIntoView({ behavior: 'smooth', inline: 'center' })
     // This scrolls the filmstrip so the active block is always visible in the center. // scrollIntoView is a built in browser method that automatically scrolls to whatever element is call on. Blocks[index] is the specific filmstrip block we just navigated to. The curly brackets pass in options to control how the scrolling behaves. behavior: 'smooth' means instead of jumping instantly it animates the scroll so it slides across. inline controls horizontal alignment — I used inline instead of block because block controls vertical alignment which isn't relevant for my horizontal filmstrip.center means it positions the active block in the middle of the visible filmstrip area rather than snapping to the left or right edge. So if you're on block 1 and hit next to go to block 8, the filmstrip smoothly slides across and lands with block 8 centered in view. // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView. 

}

document.querySelector('#next').addEventListener('click', () => {
	goToBlock(currentIndex + 1) // Used claude to help me figure this outThis is listening for a click on the next button - when its clicked it calls the goToBlock function I made above and passes in currentIndex + 1. currentIndex is the position number of the last block that was clicked (set in arena.js), so by adding 1 I'm just telling it to go one block forward. goToBlock then handles everything else like the wrapping and scrolling. the back button does the exact same thing but subtracts 1 instead to go backwards - so if I'm on block 4 (the 5th block) it calls goToBlock(3) and navigates to block 3 (the 4th block). MDN on addEventListener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
})


document.querySelector('#back').addEventListener('click', () => {
	goToBlock(currentIndex - 1) // Same as next but subtracts 1 to go backwards through the filmstrip.
})
