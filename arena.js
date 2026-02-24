let channelSlug = 'r-b-music' // The “slug” is just the end of the URL.
let myUsername = 'melody-ekbatani' // For linking to your profile.



// First, let’s lay out some *functions*, starting with our basic metadata:

// NOTES ON THIS - I wanted to hide this information coming in from the are.na channel and manually update it on my site, I did this myself through experiementation but confirmed with the code tutor who said it should be fine. Mainly did this because I wanted to customize the title/change description and hide most of the other stuff listed here.

let placeChannelInfo = (channelData) => {
	// Target some elements in your HTML:
	// let channelTitle = document.querySelector('#channel-title')
	// let channelDescription = document.querySelector('#channel-description')
	// let channelCount = document.querySelector('#channel-count')
	// let channelLink = document.querySelector('#channel-link')

	// Then set their content/attributes to our data:
	// channelTitle.innerHTML = channelData.title
	// channelDescription.innerHTML = channelData.description.html 
	// channelCount.innerHTML = channelData.counts.blocks
	// channelLink.href = `https://www.are.na/channel/${channelSlug}`
}


// DISC PLAYER INTERACTION - Making the filmstrip blocks display on into the disc player by taking the user clicking on content and displaying it on my disc player. I used copilot/claude/mdn and code tutor to confirm and explain how to do this and to understand how to pass data between elements and handle different block types.


let displayOnDisc = (blockData, blockLi) => {  // Used Claude to help me figure out the below lines, but confirmed with a code tutor who explained it more deeply to me. This is setting the variable for the block data clicked from the film strip to show on the disc. blockData = the actual Are.na API data (type, title, image URL, etc. blockLi = the HTML <li> element the user clicked in the filmstrip - using both because I need the data AND the visual element to show. 

let discImage = document.querySelector('#disc-image') // this targets the disc-image div inside my disc player is the image element in the disc player where the content will be displayed. The querySelector returns the first match - selecting content from the document. 

	// IMAGE BLOCKS - PHOTOS, GIFS
	if (blockData.type == 'Image') {
	// Are.na API tells me the type is image 

		let img = blockLi.querySelector('img')
		// Looking inside the clicked <li> for an <img> tag
		// I'm not using the API image URL directly because the filmstrip already, it's already loaded on the site so I can just grab the existing element 
	
		// TITLES/LINKS FOR IMAGE BLOCKS - PHOTOS, GIFS
		let title = document.querySelector('#block-title') // Learnt this from code tutor - setting the block title. My disc player already has a title that's not visible - this makes it visable from the document querySelector

		title.innerHTML=blockData.title 
		let link = document.querySelector('#block-link') // Learnt this from code tutor - setting the block link
		link.href = blockData.source?.url || `https://www.are.na/block/${blockData.id}`
		link.innerHTML = 'View on Are.na' // Learnt this from code tutor - setting the block link - the ? mark basically says if blockData.source is undefined → returns undefined - link if there's no other link other then arena - telling it to direct to the are.na, since my image blocks dont have other links besides are.na
		
		if (img) {
		discImage.innerHTML = `<img src="${img.src}">`
		}
		//discImage.innerHTML - replaces everything inside the disc-image (like the background) and places the new content. Backticks define create a template literal https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals. allowing for a string to be created. Creating a new image tag as a string - then ${img.src} pulls the image source from json. 
	} 
	// LINKS
	else if (blockData.type == 'Link') { // Defining the variable, else if means if its not the first thing, in this case images then do this (basically everthing thats not the first item.)

		let img = blockLi.querySelector('img') // looking inside the filmstrip item that was clicked and serching for an image first if it has a thumbnail/image

		let title = document.querySelector('#block-title') // Learnt this from code tutor - setting the block title (explained above, but also they are in the disc section since i only want the block on the disc title/link to show

		title.innerHTML=blockData.title // taking the title from the are.na data - innerHTML replaces what was in the #block-title before
		let link = document.querySelector('#block-link') // Learnt this from code tutor - setting the block link (explained above)
		link.href = blockData.source.url // Setting where the link goes - different then above since these are linking out and not to the are.na channel - no optional chaning here ? because the links always have an external url - not are.na 
		link.innerHTML = 'View Link' // Setting what goes into the linked here - 'view link' shows up on the site - wanted to clarify if the user is going to are.na or going elsewhere. 
		if (img) { // checking if an image was set 
		discImage.innerHTML = `<img src="${img.src}">` // Creating a NEW <img> tag and inserting it into the disc if there is a image
		} 
	}

	// TEXT BLOCKS - This was copied over from the image section above - please refer to the main attributions there, since the code is very similar (but i'll add a few additional attributions here as well) - unlike img blocks, there is no img to extract for this. 

	else if (blockData.type == 'Text') { // For text blocks, show the text content - setting the innerHTML to show the text value (P tag)
	discImage.innerHTML = blockLi.innerHTML

		let title = document.querySelector('#block-title') // Learnt this from code tutor - setting the block title
		title.innerHTML=blockData.title 
		let link = document.querySelector('#block-link') // Learnt this from code tutor - setting the block link
		link.href = blockData.source?.url || `https://www.are.na/block/${blockData.id}`
		link.innerHTML = 'View on Are.na' // the ? mark basically says If blockData.source is undefined then returns undefined, link if there's no other link other then are.na it gets directed to the are.na block
	}

	// ATTACHMENTS - SIMILAR TO LINKS
	else if (blockData.type == 'Attachment') {
	// For PDFs and other files, show image if available
	
		let img = blockLi.querySelector('img')// some attachments have preview images, try to find one

		let title = document.querySelector('#block-title') // setting the block title
		title.innerHTML=blockData.title  // display file name
		let link = document.querySelector('#block-link') // setting the block link
		link.href = blockData.source?.url || `https://www.are.na/block/${blockData.id}`
		link.innerHTML = 'View on Are.na' //  setting the block link - the ? mark basically says If blockData.source is undefined → returns undefined - link if there's no other link other then arena - telling it to direct to the are.na block

		if (img) {
		discImage.innerHTML = `<img src="${img.src}" alt="disc" >` // if there's an image, show it, future - could add a fallback icon for files without previews
		}
	}

	// EMBED - Youtube, soundcloud etc. 
	else if (blockData.type == 'Embed') { 
	
		discImage.innerHTML = blockLi.innerHTML // Embeds are iframes, Unlike images where I grab just the src. This preserves the iframe and its attributes so the embed stays functional

		let title = document.querySelector('#block-title') // /Same as Link blocks - takes user off Are.na to the original hosting platform
		title.innerHTML=blockData.title 
		let link = document.querySelector('#block-link') // setting the link
		link.href = blockData.source.url  // Takes user off my site and are.na into thrid party site
		link.innerHTML = 'Listen' // Text to display
	}

	// ACTIVE STATE - SELECTING FILM STRIP ITEM
	document.querySelectorAll('#channel-blocks li').forEach(li => {
	li.classList.remove('active') // Clears any previous selection so only one block is highlighted at a time, learned this pattern from my code tutor. 
	})

	blockLi.classList.add('active') // Add 'active' to the block that was just clicked to show it's active. 
}


	
// Then our big function for specific-block-type rendering:
let renderBlock = (blockData, i) => {
	// To start, a shared `ul` where we’ll insert all our blocks. // i is the second parameter added so renderBlock can receive the position number // from the forEach loop — forEach automatically counts each item (0, 1, 2, 3 etc.)// but only shares it if you ask by adding i as a second parameter here AND in the forEach call. // Without it, currentIndex = i inside the click listeners would break. // MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach // YouTube: https://www.youtube.com/watch?v=e2qbolkHKt4
	let channelBlocks = document.querySelector('#channel-blocks')

	// Links!
	if (blockData.type == 'Link') {
		// Declares a “template literal” of the dynamic HTML we want.

		
		let linkItem =
			`
			<li>
				<figure>
					<picture>
						<source media="(width < 500px)" srcset="${ blockData.image.small.src_2x }">
						<source media="(width < 1000px)" srcset="${ blockData.image.medium.src_2x }">
						<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }">
					</picture>
				</figure>
				<p><a href="${ blockData.source.url }">See the original ↗</a></p>
			</li>
			`

		// And puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)


		// MAKING FILMSTRIP BLOCKS CLICKABLE
		// When user clicks a block in the filmstrip, it should display on the disc used claud and copilot to helped structure the function logic and reviewed my understanding with the code tutor, added click event listener to trigger displayOnDisc function
	
		let blockLi = channelBlocks.lastElementChild //Getting the <li> we just created and added to the filmstrip, lastElementChild gives us the most recently appended child, this is the NEW block we're setting up, not an old one
		blockLi.addEventListener('click', () => { //addEventListener attaches a click handler to this specific <li> - refrenced MDN to review this. FYI Arrow function () => {} runs when the block is clicked
		currentIndex = i // THIS IS IMPORTANT FOR THE BUTTON ANIMATION - Remembers the position of the last block clicked. Starts at -1 meaning nothing clicked yet. Updates to that block's number when clicked — so the 5th block = 4 (counting starts at 0). next/back then just add or subtract 1 from this. gives the index (i) number of each item as a parameter (basically counts what number each block is). I'm adding it in currentIndex when a block is clicked so that the back/next buttons // in script.js know where we are in the list and can do currentIndex + 1 or - 1 for the forward and back icon. // Learnt about foreach's parameter from Claude but used MDN and some YouTube videos (https://www.youtube.com/watch?v=e2qbolkHKt4) to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
		displayOnDisc(blockData, blockLi) // works through event type and callback function
	})
		

		// More on template literals:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	}

	// Images!
	else if (blockData.type == 'Image') {
		 let imageItem =

		// Couldn't figure this out for the longest time, but I rewatched the loom and lecture and asked co-pilot help as well. This starts a list item (meant to go inside a <ul> item). The figure element is a semantic wrapper for the images and its caption. 
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        `
        <li>
            <figure>
                <img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
            </figure>
        </li>
     `
	 channelBlocks.insertAdjacentHTML('beforeend', imageItem)

	 // ATTRIBUTION - SAME AS ABOVE FOR MAKING FILMSTRIP BLOCKS CLICKABLE FOR LINKS
	let blockLi = channelBlocks.lastElementChild
	blockLi.addEventListener('click', () => {
	currentIndex = i // Explained above 
	displayOnDisc(blockData, blockLi)
	})
	}

	// Text!
	else if (blockData.type == 'Text') {
		 let textItem =
        `
        <li>
			<div class="text">
            <h3>${blockData.title || 'Untitled'}</h3>
            <p>${blockData.content.html}</p>
			</div>
        </li>
        `
    channelBlocks.insertAdjacentHTML('beforeend', textItem)
	
	
	let blockLi = channelBlocks.lastElementChild
	blockLi.addEventListener('click', () => {
	currentIndex = i // Explained above 
   	displayOnDisc(blockData, blockLi)
	})
	}

	// Uploaded (not linked) media…
	else if (blockData.type == 'Attachment') {
		let contentType = blockData.attachment.content_type // Save us some repetition.

		// Uploaded videos!
		if (contentType.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			// my code tutor taught me to use the div class to attempt to round the corners of the video, but I couldn't get it to work. I think it has to do with how youtube is embedding the video, but I could be wrong. I also tried to add the border-radius to the video element itself, but that didn't work either. any suggestions you have would be much appreciated!
			let videoItem =
				`
				<li>
				
				<div class="embedded-video">
					<video controls src="${ blockData.attachment.url }"></video>
				</div>
				</li>
				`
			 // ATTRIBUTION - SAME AS ABOVE FOR MAKING FILMSTRIP BLOCKS CLICKABLE FOR LINKS
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			let blockLi = channelBlocks.lastElementChild
			blockLi.addEventListener('click', () => {
			currentIndex = i // Explained above 
			displayOnDisc(blockData, blockLi)
})
			// More on `video`, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs! I still need to add ATTRIBUTIONS HERE!!
		else if (contentType.includes('pdf')) {
			 let pdfItem =
        `
        <li>
		<div class="embedded">
    	<embed src="${blockData.attachment.url}" type="application/pdf" width="100%" height="600px">
		</div>
    	<p><a href="${blockData.attachment.url}" download>Download PDF↗</a></p>
        </li>
        `

    channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

	let blockLi = channelBlocks.lastElementChild
	blockLi.addEventListener('click', () => {
	currentIndex = i // Explained above 
	displayOnDisc(blockData, blockLi)
			})

		}

		// Uploaded audio!
		else if (contentType.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<audio controls src="${ blockData.attachment.url }"></audio>
				</li>
				`
 			// ATTRIBUTION - SAME AS ABOVE FOR MAKING FILMSTRIP BLOCKS CLICKABLE FOR LINKS
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)

			let blockLi = channelBlocks.lastElementChild
			blockLi.addEventListener('click', () => {
			currentIndex = i // Explained above 
			displayOnDisc(blockData, blockLi)
})
			// More on`audio`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked (embedded) media…
	else if (blockData.type == 'Embed') {
		let embedType = blockData.embed.type

		// Linked video!
		if (embedType.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li>
					${ blockData.embed.html }
				</li>
				`
			// ATTRIBUTION - SAME AS ABOVE FOR MAKING FILMSTRIP BLOCKS CLICKABLE FOR LINKS
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)

			let blockLi = channelBlocks.lastElementChild
			blockLi.addEventListener('click', () => {
			currentIndex = i // Explained above 
			displayOnDisc(blockData, blockLi)
			})

			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// LINKED AUDIO EMBEDS
		else if (embedType.includes('rich')) { // Audio embeds from Spotify/Soundcloud weren't displaying. Code tutor helped me debug using console.log to inspect the API data We reviewed using the console.log to figure out which piece of data is needed to show the right file type, first trying to embed the url. I learnt that these programs have specific ways they want developpers to embed songs/materials and found the embed.html worked for this. Also generally reviewed how to find things in the consol and target specific areas of the channel block source. Soundcloud, spotify and apple music uses rich embed types - providing pre-built embed elements. 

			let linkedAudioItem =
			`
			<li>
					${ blockData.embed.html }
			</li>
			`
			// ATTRIBUTION - SAME AS ABOVE FOR MAKING FILMSTRIP BLOCKS CLICKABLE FOR LINKS
			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)

			let blockLi = channelBlocks.lastElementChild
			blockLi.addEventListener('click', () => {
			currentIndex = i // Explained above 
			displayOnDisc(blockData, blockLi)
		})
		}
	}
}



// A function to display the owner/collaborator info:
let renderUser = (userData) => {
	let channelUsers = document.querySelector('#channel-users') // Container.

	let userAddress =
		`
		<address>
			<img src="${ userData.avatar }">
			<h3>${ userData.name }</h3>
			<p><a href="https://are.na/${ userData.slug }">Are.na profile ↗</a></p>
		</address>
		`

	channelUsers.insertAdjacentHTML('beforeend', userAddress)
}



// Finally, a helper function to fetch data from the API, then run a callback function with it:
let fetchJson = (url, callback) => {
	fetch(url, { cache: 'no-store' })
		.then((response) => response.json())
		.then((json) => callback(json))
}

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch



// Now that we have said all the things we *can* do, go get the channel data:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}`, (json) => {
	console.log(json) // Always good to check your response!

	placeChannelInfo(json) // Pass all the data to the first function, above.
	//renderUser(json.owner) // Pass just the nested object `.owner`.
})

// Get your info to put with the owner's:
//fetchJson(`https://api.are.na/v3/users/${myUsername}/`, (json) => {
//console.log(json) // See what we get back.

//renderUser(json) // Pass this to the same function, no nesting.
//})

// // And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
console.log(json) // See what we get back.

// 	// Loop through the nested `.data` array (list).
json.data.forEach((blockData, i) => {
console.log(blockData) // The data for a single block. // forEach gives the index (i) number of each item as a parameter (basically counts what number each block is). I'm adding it in currentIndex when a block is clicked so that the back/next buttons // in script.js know where we are in the list and can do currentIndex + 1 or - 1 for the forward and back icon. // Learnt about foreach's parameter from Claude but used MDN and some YouTube videos (https://www.youtube.com/watch?v=e2qbolkHKt4) to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 

renderBlock(blockData, i) // Explained a few times throughout the code but (i) sets a parameter to each block so it assigns it an item number. The reason it's here is because this is the moment each block gets created, forEach is looping through all my Are.na blocks one by one and handing them to renderBlock to build the HTML. Since i only exists inside this forEach loop, this is the only place you can pass it through. Pass the single block’s data to the render function. Learnt this on claude, but also kind of found this reddit comment helpful to understand it better: i = whatever index (0,1,2,3 whatever) of a. i changes its value with each loop, starts at 0 and increases by one each loop. Arrays hold a list of values and each one is accessible by its number in the list (its index). So a[i] means go inside a and get me the value with the index of i. - lorls333. By applying it here its building the index that changes with the values.  
	})
})
