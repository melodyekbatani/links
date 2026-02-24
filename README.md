# Links

### Tools
HTML, CSS, JavaScript, Are.na API

### Link
https://melodyekbatani.github.io/links/

## Overview
Links is an interactive collection that translates an Are.na collection into a playable interface. Instead of scrolling through references, the project frames the content as a CD player: the disc becomes the primary viewing surface, and the filmstrip becomes navigation. The collection traces defining moments in R&B through album cover art and artist references, exploring themes of identity, intimacy, and visual culture, and reflecting on what it means to make R&B music today as a genre shaped by human stories and emotion.

## Approach
I approached this design system as it was rooted in typography, scale, spacing, and color, so the interface stays proportional across screen sizes. The disc, controls, and filmstrip are all sized using clamp() and calc(), allowing the experience to shift fluidly from mobile to desktop while maintaining the physical logic of a player.

Different media types from Are.na are rendered inside a single consistent frame. CSS determines how each block type appears, while JavaScript manages state tracking the active block, updating the title and link, and moving through the collection using back and next controls.

## Experiments
This project went through many visual and interaction iterations to capture the atmosphere of R&B, where I tested various layouts, motion speeds, scaling behaviors, and image treatments. The project is typeset in FF Blur, originally designed by Neville Brody around the introduction of the Mac and widely used across 2000s album covers, paired with Chillax by Indian Type Foundry.

## Results
Links shifted my understanding of what it means to design with code. Instead of styling a page, I built a set of rules that allow dynamic content to behave consistently. I learned how motion, hierarchy, and interaction can reinforce a conceptual frame, and how JavaScript connects interface elements. 

#### Direction by Trenton Soto.
