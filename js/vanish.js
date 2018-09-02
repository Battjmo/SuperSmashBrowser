const vanish = {
  activated: false,
  wand1: chrome.extension.getURL('images/wand1.png'),
  wand2: chrome.extension.getURL('images/wand2.png'),

  toggleVanish: function() {
    if (vanish.activated) {
      vanish.activated = false;
      vanish.deactivateTargetMode();
    } else {
      vanish.activated = true;
      vanish.activateTargetMode();
    }
  },

  activateTargetMode: function() {
    document.addEventListener('mousedown', vanish.removeEl, true);
    document.addEventListener('mouseup', vanish.handlePrevent, true);
    document.addEventListener('click', vanish.handlePrevent, true);
    vanish.addDivHelper();
    vanish.addModeDisplay();

    const wandStyle = document.createElement('style');
    const staticWand = `*, *:hover { cursor: url(${vanish.wand1}), auto !important} `;
    const activeWand = `*:active { cursor: url(${vanish.wand2}) 3 13, auto !important}`;
    wandStyle.id = 'super-smash-cursor';
    wandStyle.appendChild(document.createTextNode(staticWand + activeWand));
    document.getElementsByTagName('head')[0].appendChild(wandStyle);
  },

  deactivateTargetMode: function() {
    document.removeEventListener('mousedown', vanish.removeEl, true);
    document.removeEventListener('mouseup', vanish.handlePrevent, true);
    document.removeEventListener('click', vanish.handlePrevent, true);
    document.getElementById('super-smash-cursor').remove();
    document.getElementById('super-smash-mode-div').remove();
    vanish.removeDivHelper();
  },

  removeEl: function(e) {
    if (e.target.className === 'super-smash-div-helper') {
      vanish.animate(e.target.sibling);
    }
    vanish.animate(e.target);

    // relocate div helpers
    setTimeout(() => {
      vanish.removeDivHelper();
      vanish.addDivHelper();
    }, 4000);

    vanish.handlePrevent(e);
    return false;
  },

  // cover iframes and embeds on activation
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

  addModeDisplay: function() {
    const display = document.createElement('div');
    display.id = 'super-smash-mode-div';
    display.innerHTML = 'Wand Mode Activated!';

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

  animate: function(element) {
    Object.assign(element.style, {
      transition: 'all 1s',
      fontSize: '0',
      opacity: '0'
    });

    setTimeout(() => {
      Object.assign(element.style, {width: '0', height: '0'});
      setTimeout(() => { element.style.display = 'none'; }, 1000);
    }, 1000);
  },

  handlePrevent(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};
