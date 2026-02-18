let channelSlug = 'r-b-music' // The “slug” is just the end of the URL.
let myUsername = 'melody-ekbatani' // For linking to your profile.



// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (channelData) => {
	// Target some elements in your HTML:
	// let channelTitle = document.querySelector('#channel-title')
	// let channelDescription = document.querySelector('#channel-description')
	// let channelCount = document.querySelector('#channel-count')
	// let channelLink = document.querySelector('#channel-link')

	// Then set their content/attributes to our data:
	// channelTitle.innerHTML = channelData.title
	channelDescription.innerHTML = channelData.description.html
	channelCount.innerHTML = channelData.counts.blocks
	// channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (blockData) => {
	// To start, a shared `ul` where we’ll insert all our blocks
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

			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

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

			channelBlocks.insertAdjacentHTML('beforeend', audioItem)

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

			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)

			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embedType.includes('rich')) {
			console.log("this is for embedded audio", blockData)
			//ATTRIBUTION
			// GOAL: my audio files weren't showing up, specifically embeddeds from spotify and soundcloud
			// RESOURCE: Talked to a code tutor 
			// LEARNING: We reviewed using the console.log to figure out which piece of data is needed to show the right file type, first trying to embed the url. I learnt that these programs have specific ways they want developpers to embed songs/materials and found the embed.html worked for this. Also generally reviewed how to find things in the consol and target specific areas of the channel block source. Also reviewed let statements together

			let linkedAudioItem =
			`
			<li>
					${ blockData.embed.html }
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
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

// And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
	console.log(json) // See what we get back.

	// Loop through the nested `.data` array (list).
	json.data.forEach((blockData) => {
		// console.log(blockData) // The data for a single block.

		renderBlock(blockData) // Pass the single block’s data to the render function.
	})
})
