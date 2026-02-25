# Links
This project was created for Typography & Interaction in the Parsons MPS Communication Design program, taught by Michael Fehrenbach and Eric Li. The assignment asked us to collaboratively assemble and organize a themed collection in Are.na, then design and build a responsive interface that explores that collection using its API. Using Are.na as a content management system, I translated a curated R&B archive into an interactive website that connects, structures, and dynamically presents its content.

### Live Link
https://melodyekbatani.github.io/links/

### Are.na
Direction by Trenton Soto
https://www.are.na/trenton-soto-ortkizxpaha/r-b-music 

### Tech Stack
HTML, CSS, Vanilla JavaScript, Are.na API

### Overview
The collection traces defining moments in R&B through album cover art and artist references, exploring themes of identity, intimacy, and visual culture, and reflecting on what it means to make R&B music today as a genre shaped by human stories and emotion. Instead of scrolling through references, the project frames the content as a CD player where the disc frame is the primary viewing surface, and the filmstrip is the central navigation. 

### Approach to Responsive Design
I approached this design system with considerations rooted in typography, scale, spacing, and color, so the interface stays proportional across screen sizes. The disc, controls, and filmstrip are all sized using clamp() and calc(), allowing the experience to shift fluidly from mobile to desktop while maintaining the physical logic of a player. Different media types from Are.na are rendered inside a single consistent frame. CSS determines how each block type appears, while JavaScript manages state tracking the active block, updating the title and link, and moving through the collection using back and next controls.

### Experiments
This project went through many visual and interaction iterations to capture the atmosphere of R&B, where I tested various layouts, motion speeds, scaling behaviors, and image treatments. The project is typeset in FF Blur, originally designed by Neville Brody around the introduction of the Mac and widely used across 2000s album covers, paired with Chillax by Indian Type Foundry.

### System Design
The site runs in two phases. First, it pulls content from the Are.na API and builds the filmstrip. Each block is rendered with renderBlock(), and when you click one, it updates the disc, the title/link, and the active state so the interface always knows what’s “currently playing.”

### Navigation
Navigation is driven by currentIndex, which remembers the last block you clicked. The Next and Back buttons just add or subtract from that number, loop at the ends, and trigger the correct block while smoothly centering it in the filmstrip.

### Content Design
All the different Are.na block types get translated into the same circular frame. Images become full-bleed, text is typeset to fit inside the disc, links and attachments get the bookmark treatment, and embeds keep their iframe so the media is playable using a modal. 

### Motion and Playback
The disc's spin lives in CSS and uses JavaScript to turn it on and off depending on user preference. The Pause/Play button flips the animation state. Embed blocks open a separate listen modal that loads the player dynamically. When it closes, the embed gets wiped, so the audio doesn’t keep playing in the background. 

## Filmstrip Interaction
The filmstrip is a fixed horizontal scroll that behaves like a track list. The active item scales and blurs, and custom thumbnails keep all the different media types visually consistent.

### Additional Tools and Resources
To support the development of this project, I used a range of learning resources alongside the core technical tools. Claude and ChatGPT helped me understand new concepts, troubleshoot issues, and revisit previously learned material. When using LLMs, I consistently verified the logic against documentation and examples from MDN, Stack Overflow, and YouTube to ensure accuracy and deepen my understanding of how the code works. I also reviewed my code and design with code tutors at several stages of the process. These sessions focused on reading through the code together, clarifying syntax and structure, and strengthening my ability to reason through problems independently.

To create a consistent visual language across the thumbnails, disc, and playable music, I sourced a range of base materials from the Figma community, YouTube music, and image stock libraries, then reworked them in Photoshop to match the atmosphere of the project to enhance the overall art direction. I tried to implement a cohesive mood by color, contrast, texture, and cropping so every asset feels like it belongs to the same system and reinforces the theme of the collection.

### Next Steps
If I had more time, I’d push the interaction further so the player feels more alive and responsive. I want the control buttons to have clearer hover, active, and disabled states. For the connection between the filmstrip, disc, and navigation, I'd love for them to integrate the interaction further so moving through the collection feels like real playback instead of just switching content. I’d also connect my actual playlist so the Listen state becomes a continuous, curated sequence rather than a more general mix of music I found. For motion, I’d add a proper spin-down animation so the disc slowly winds down instead of stopping abruptly. Beyond that, I’d keep polishing performance and accessibility to improve focus states and make the system stronger as the collection grows.
