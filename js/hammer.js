const hammer = {
  activated: false,
  hammer1: chrome.extension.getURL('images/hammer.png'),
  hammer2: chrome.extension.getURL('images/hammerSideways.png'),

  toggleHammer: function() {
    if (hammer.activated) {
      hammer.activated = false;
      hammer.deactivateTargetMode();
    } else {
      hammer.activated = true;
      hammer.activateTargetMode();
    }
  },

  activateTargetMode: function() {
    document.addEventListener('mousedown', hammer.execute, true);
    document.addEventListener('mouseup', hammer.handlePrevent, true);
    document.addEventListener('click', hammer.handlePrevent, true);
    hammer.addDivHelper();
    hammer.addModeDisplay();

    const hammerStyle = document.createElement('style');
    const staticHammer = `*, *:hover { cursor: url(${hammer.hammer1}), auto !important} `;
    const activeHammer = `*:active { cursor: url(${hammer.hammer2}), auto !important}`;
    hammerStyle.id = 'super-smash-cursor';
    hammerStyle.appendChild(document.createTextNode(staticHammer + activeHammer));
    document.getElementsByTagName('head')[0].appendChild(hammerStyle);
  },


  deactivateTargetMode: function() {
    document.removeEventListener('mousedown', hammer.execute, true);
    document.removeEventListener('mouseup', hammer.handlePrevent, true);
    document.removeEventListener('click', hammer.handlePrevent, true);
    document.getElementById('super-smash-cursor').remove();
    document.getElementById('super-smash-mode-div').remove();
    hammer.removeDivHelper();
  },

  execute: function(e) {
    let element = e.target;

    if (element.tagName === 'CANVAS') {
      hammer.handleCanvas(e);
    } else if (element.offsetHeight < 25 || element.offsetWidth < 25) {
      const tags = ['B', 'I', 'STRONG', 'CODE'];
      if (tags.includes(element.nodeName)) {
        hammer.animateFall(element.parentNode);
      } else {
        hammer.animateFall(element);
      }
    } else {
      hammer.overlayCanvas(e);
    }

    // relocate div helpers
    setTimeout(() => {
      hammer.removeDivHelper();
      hammer.addDivHelper();
    }, 3000);

    hammer.handlePrevent(e);
    return false;
  },

  handleCanvas: function(e) {
    let mouse = hammer.getMousePos(e);
    hammer.draw(e.target, mouse.x, mouse.y);
    e.target.counter++;
    if (e.target.counter === 5) {
      hammer.animateFall(e.target);
      hammer.animateFall(e.target.sibling);
      if (e.target.sibling.sibling) {
        hammer.animateFall(e.target.sibling.sibling);
      }
    }
  },

  animateFall: function(element) {
    const translateX = (Math.random() - 0.5) * window.innerWidth;
    const translateY = window.innerHeight;

    Object.assign(element.style, {
      transition: 'all 1s',
      position: 'relative',
      transform: `translate(${translateX}px, ${translateY}px) rotate(360deg)`,
      opacity: '0',
      width: '0',
      height: '0',
    });
    setTimeout(() => {element.style.visibility = 'hidden';}, 1500);
  },

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
        zIndex: '5000'

      });
      el.parentNode.insertBefore(div, el.nextSibling);
    });
  },

  removeDivHelper: function() {
    const divs = document.querySelectorAll('.super-smash-div-helper');
    divs.forEach(div => div.remove());
  },

  randomSmash: function(smashes) {
    let smash = Math.floor(Math.random() * 4);
    return smashes[smash];
  },

  getMousePos: function(e) {
    const rect = e.target.getBoundingClientRect();
    const scaleX = e.target.offsetWidth / rect.width;
    const scaleY = e.target.offsetHeight / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
  },

  overlayCanvas: function(e) {
    const canvas = document.createElement('canvas');
    canvas.className = 'super-smash-canvas';
    canvas.sibling = e.target;

    canvas.width = e.target.offsetWidth;
    canvas.height = e.target.offsetHeight;
    canvas.counter = 1;

    Object.assign(canvas.style, {
      position: 'absolute',
      top: `${e.target.offsetTop}px`,
      left: `${e.target.offsetLeft}px`,
      padding: '0',
      margin: '0',
      zIndex: '5000'
    });
    // canvas.style.border = 'solid 1px red';

    if (e.target.parentNode.nodeName === '#document') return;

    e.target.parentNode.insertBefore(canvas, e.target.nextSibling);
    let mouse = hammer.getMousePos(e);
    hammer.draw(canvas, mouse.x, mouse.y);
  },

  draw: function(canvas, x, y) {
    let smashed1 = new Image();
    let smashed2 = new Image();
    let smashed3 = new Image();
    let smashed4 = new Image();
    smashed1.src = chrome.extension.getURL("./images/smashed_1.png");
    smashed2.src = chrome.extension.getURL("./images/smashed.png");
    smashed3.src = chrome.extension.getURL("./images/smashed_2.png");
    smashed4.src = chrome.extension.getURL("./images/smashed_3.png");

    const ctx = canvas.getContext('2d');
    let smashes = [smashed1, smashed2, smashed3, smashed4];

    //draw initial smash
    let smash = hammer.randomSmash(smashes);
    let smashX = x - (smash.width / 2);
    let smashY = y - (smash.height / 2);

    ctx.drawImage(smash, smashX, smashY);
  },

  addModeDisplay: function() {
    const display = document.createElement('div');
    display.id = 'super-smash-mode-div';
    display.innerHTML = 'Smash Mode Activated!';

    Object.assign(display.style, {
      position: 'fixed',
      top: '10px',
      left: '10px',
      padding: '10px',
      fontFamily: 'Comic Sans MS, sans-serif',
      fontSize: '15px',
      color: '#fff',
      backgroundColor: '#fe1a29',
      border: '1px solid #acadaf',
      borderRadius: '3px',
      zIndex: '10000',
      opacity: '0'
    });

    document.body.appendChild(display);

    setTimeout(() => {
      display.style.transition = 'opacity 0.5s';
      display.style.opacity = '0.9';
    }, 500);
  },

  animate: function (element) {
    Object.assign(element.style, {
      transition: 'all 1s',
      fontSize: '0',
      opacity: '0'
    });

    setTimeout(() => {
      Object.assign(element.style, { width: '0', height: '0' });
      setTimeout(() => { element.style.display = 'none'; }, 1000);
    }, 1000);
  },

  handlePrevent: function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};
