# Super Smash Browser Proposal:

## SUMMARY AND BACKGROUND
---

Nearly every day, we see something on the internet that makes us angry or sad, and that we can't do anything about. Super Smash Browser is a Chrome extension that allows users to vent their frustrations by destroying the contents of their browser window, without hacking into anything or going to prison. Instead, we will use a variety of JS effects to give the illusion of having made the webpage disappear, be smash in a trash compactor, or even consumed in fire. Upon reload, ntohing will have changed.

## Functionality and MVP
---

-[ ] There will be a popup window that allows a user to select a destruction mode, and offer instructions for how to use it.

-[ ] The user will be able to destroy the browser in a variety of ways, tentatively including:
1. Vanish: make all the content disappear in a graceful wave.
2. Trash compactor: walls come in from sides of the screen, crushing the content into a little box in the middle.
3. Fire: user will click the screen to make a fire start there, which will consume the content.
Stretch Modes:
1. Earthquake: screen shake, followed by elements falling off the screen.
2. Hammer: Mouse

### Bonus Features
1. Built-in ability to save and share GIF's of your destruction.
2. Social integration, so users can see how many people have destroyed the pages they visit.

## Technologies and Challenges
---
- JavaScript, JavaScript, and more JavaScript for DOM manipulation
- HTML5 Canvas for animation
- Chome tools for extension implementation

### Interacting With the Browser
- We will compose a variety of functions that enable us to select the relevant DOM elements for the chosen destruction methods and place them in an array for easy manipulation.
- We will also develop an algorithm for overlaying a Canvas element on top of a webpage, so that the user can draw upon it using our fire and trash compactor tools.
- These two techniques will need to be connects as well, in order to allow the animation to sync with and control what is happening to the DOM elements. For example, in the trash compactor mode, the user will use the arrow keys to move the walls on the compactor, which will in turn change the margins of the page being viewed, causing the content to compress.

### UX
This part should hopefully be pretty simple: the user will be presented with a small menu, enabling them to select a mode. Upon doing so, that window will display instructions for how to interact with the mode they've chosen.

## Accomplished Over the Weekend
---

- Made animation program for the trash compactor mode.
- Developed an alorithm for selecting all the DOM elements on a page and making them gracefully disappear.
- Researched using canvas to make sprites appear in response to mouse inputs.
- Developed algorithm for making dom elements spin around like wild things.


## Implementation Timeline
---
GROUP MEMBERS: NICK BATTJES, NATHAN HARRIS, HAN CHEN

DAY 1:
- Nick: finalize animation for trash compactor, start on fire animation.
- Nate: 
- Han:

DAY 2:
- Nick: continue fire animation, work on integrating animation for trash compactor with margin adjustment.
- Nate: 
- Han:

DAY 3:
- Nick: Hopefully get fire and trash compactor to both work with dom elements.
- Nate: 
- Han:

DAY 4:
- Nick: Continue work on trash compactor and fire, finish them.
- Nate: 
- Han:

DAY 5:
- Nick: Start work on stretch animations, if able.
- Nate: 
- Han:

DAY 6:
- Nick: Make sure everything works!
- Nate: 
- Han:

DAY 7:
- Nick: Finalize menu implementation.
- Nate: 
- Han: