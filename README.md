# Super Smash Browswer: A Chrome Extension for Venting Frustration

[Get It Here!](https://chrome.google.com/webstore/detail/supersmashbrowser/bdlmjfkblpjnkienagkgljcodcgjjjml)

![Disappearing GIF](https://media.giphy.com/media/22RxGPGrf1UAcZobWC/giphy.gif)

## Overview

Super Smash Browser is a Google Chrome extension that allows the user to take out their anger on the content they see by making it disappear with a magic wand or smashing it up with a hammer. If they lack the patience for either of those, a third option enables them to simply make the whole page they're looking at disappear into nothingness.

---

## Instructions

To use the extension, add it to Chrome at the link above. Navigate to a page you wish to destroy. Click the icon for the extension in the top right of the browser, and select the mode of destruction you wish to employ. Click outside of the popup to activate your chosen mode, and start clicking to destroy away.

---

![Wand Gif](https://media.giphy.com/media/1r8SQfFlbvaaWeVRLZ/giphy.gif)

Magic Wand Mode in Action

---

## Technologies

- JavaScript for DOM manipulation
- HTML5 Canvas for drawing on top of said DOM elements
- Standard Chrome Extension backbone
- Adobe Illustrator for making custom cursors
- Git for collaboration and version control

---

## Breaking Websites

We use some original, novel JavaScript algorithms to enable users to manipulate the DOM of sites they visit:

### Vanish Everything

This mode was the first and simplest: We simply use the algorithm below to make the entire DOM disappear:

```javascript
class VanishEverything {
  constructor() {
    this.body = document.body;
    this.els = [];
    this.disappear = this.disappear.bind(this);
  }

  disappear() {
    this.body.style.transition = 'all 1s';
    this.body.style.opacity = '0';
    setTimeout( () => {this.body.style.display = "none";}, 2000);
  }

```

---

### Magic Wand

The Magic Wand mode, which gives users a wand they can use to vanish individual elements on pages, works by assigning clicked elements an opacity of 0 and a display of none:

```javascript


  animate: function(element) {
    Object.assign(element.style, {
      transition: 'all 1s',
      fontSize: '0',
      opacity: '0'
    });
    setTimeout(() => {
      Object.assign(element.style, {width: '0', height: '0'});
      setTimeout(() => {element.style.display = 'none';}, 1000);
    }, 1000);
  }
  ```

  To account for elements that have their own click handling that prevents ours from working correctly, we overlay divs on top of them as siblings, then manipulate the pair together:

  ```javascript
    addDivHelper: function() {
    const els = document.querySelectorAll('iframe, embed');

    els.forEach(el => {
      let div = document.createElement('div');
      div.className = 'super-smash-div-helper';
      div.sibling = el;
      Object.assign(div.style, {
        position: 'absolute',
        width: `${el.offsetWidth}px`,
        height: `${el.offsetHeight}px`,
        top: `${el.offsetTop - el.scrollTop}px`,
        left: `${el.offsetLeft - el.scrollLeft}px`,
        background: 'rgba(0, 0, 0, 0)',
        zIndex: '500'
      });
      el.parentNode.insertBefore(div, el.nextSibling);
    });
  },

  removeDivHelper: function() {
    const divs = document.querySelectorAll('.super-smash-div-helper');
    divs.forEach(div => div.remove());
  },
  ```

We also created custom cursors for this mode and Hammer Time using Illustrator, which we inject onto the page when the respective mode is activated:

```javascript
  activateTargetMode: function() {
    document.addEventListener('mousedown', vanish.removeEl, true);
    document.addEventListener('mouseup', vanish.handlePrevent, true);
    document.addEventListener('click', vanish.handlePrevent, true);
    vanish.addDivHelper();

    const wandStyle = document.createElement('style');
    const staticWand = `*, *:hover { cursor: url(${vanish.wand1}), auto !important} `;
    const activeWand = `*:active { cursor: url(${vanish.wand2}) 3 13, auto !important}`;
    wandStyle.id = 'super-smash-cursor';
    wandStyle.appendChild(document.createTextNode(staticWand + activeWand));
    document.getElementsByTagName('head')[0].appendChild(wandStyle);
  },
```

As you can see, each mode has a pair of cursors: a default one and one that is only displayed when the mouse is clicked, using the :active psuedo-class.

---

### Hammer Time

![Hammer GIF](https://media.giphy.com/media/5eFi7W9QhbLQm7BfM5/giphy.gif)

For our final mode, and the one that gives our extension its name, we give the user the ability to smash up the DOM with a hammer. This is accomplished by overlaying HTML5 canvases on elements when users click on them, which in turn get cracks drawn on them on click. When a given element accumulates five clicks, it spins away off the screen on a vector. To compensate for elements too small for this to work nicely, those simply drop off the page right away.

```javascript
  execute: function(e) {
    let element = e.target;

    if (element.tagName === 'CANVAS') {
      let mouse = hammer.getMousePos(e);
      hammer.draw(element, mouse.x, mouse.y);
      element.counter++;
      if (element.counter === 5) {
        hammer.animateFall(element);
        hammer.animateFall(element.sibling);
        if (element.sibling.sibling) {
          hammer.animateFall(element.sibling.sibling);
        }
      }
    } else if (element.offsetHeight < 25 || element.offsetWidth < 25) {
      const tags = ['B', 'CODE', 'STRONG'];
      if (tags.includes(element.nodeName)) {
        hammer.animateFall(element.parentNode);
      } else {
        hammer.animateFall(element);
      }
    } else {
      hammer.overlayCanvas(e);
    }
```

Enjoy!





