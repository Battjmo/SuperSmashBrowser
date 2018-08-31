const hammer = {
  activated: false,
  smashed1: new Image().src = chrome.extension.getURL("./images/smashed_1.png"),
  smashed2: new Image().src = chrome.extension.getURL("./images/smashed.png"),
  smashed3: new Image().src = chrome.extension.getURL("./images/smashed_2.png"),
  smashed4: new Image().src = chrome.extension.getURL("./images/smashed_3.png"),
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

    const hammerStyle = document.createElement('style');
    const staticHammer = `*, *:hover { cursor: url(${hammer.hammer1}), auto !important} `;
    const activeHammer = `*:active { cursor: url(${hammer.hammer2}) 3 13, auto !important}`;
    hammerStyle.id = 'super-smash-cursor';
    hammerStyle.appendChild(document.createTextNode(staticHammer + activeHammer));
    document.getElementsByTagName('head')[0].appendChild(hammerStyle);
  },


  deactivateTargetMode: function() {
    document.removeEventListener('mousedown', hammer.execute, true);
    document.removeEventListener('mouseup', hammer.handlePrevent, true);
    document.removeEventListener('click', hammer.handlePrevent, true);
    hammer.removeDivHelper();
  },

  // getMousePos: function(canvas, e) {
  //   var rect = canvas.getBoundingClientRect(),
  //   scaleX = canvas.width / rect.width,
  //   scaleY = canvas.height / rect.height;

  //   return {
  //     x: (e.clientX - rect.left) * scaleX,
  //     y: (e.clientY - rect.top) * scaleY
  //   }
  // },

  execute: function(e) {
    if (e.target.tagName === 'CANVAS') {
        let mouse = hammer.getMousePos(e);
        hammer.draw(e.target, mouse.x, mouse.y);
        e.target.counter++;
        console.log(e.target.counter);
        if (e.target.counter === 5) {
          hammer.animate(e.target);
          hammer.animate(e.target.sibling);
        }
    } else {
        hammer.overlayCanvas(e);
    }
    hammer.handlePrevent(e);
    return false;
  },

  animateSpin: function(e) {},

  animateFall: function(e) {},

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
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: '500000'
      });
      el.parentNode.insertBefore(div, el.nextSibling);
    });
  },

  removeDivHelper: function() {
    const divs = document.querySelectorAll('.super-smash-div-helper');
    divs.forEach(div => div.remove());
  },

  randomSmash: function(smashes) {
    smash = Math.floor(Math.random() * 4);
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

      canvas.style.position = 'absolute';
      canvas.style.border = 'solid 1px red';
      canvas.style.top = `${e.target.offsetTop}px`;
      canvas.style.left = `${e.target.offsetLeft}px`;

      canvas.style.padding = '0';
      canvas.style.margin = '0';

      canvas.zIndex = '5000';
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
    let smashes= [smashed1, smashed2, smashed3, smashed4];

    //draw initial smash
    let smash = hammer.randomSmash(smashes);
    let smashX = x - (smash.width / 2);
    let smashY = y - (smash.height / 2);

    ctx.drawImage(smash, smashX, smashY);
    
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
