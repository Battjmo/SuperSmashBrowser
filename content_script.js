console.log('content script loaded');
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.type === 'button') {
    console.log("i have been clicked");
    vanish.toggleVanish();
  }
});


const vanish = {
  activated: false,

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

    document.body.style.cursor = 'pointer';
  },

  deactivateTargetMode: function() {
    document.removeEventListener('mousedown', vanish.removeEl, true);
    document.removeEventListener('mouseup', vanish.handlePrevent, true);
    document.removeEventListener('click', vanish.handlePrevent, true);
    vanish.removeDivHelper();
    document.body.removeAttribute('cursor');
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
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: '500'
      });
      el.parentNode.insertBefore(div, el.nextSibling);
    });
  },

  removeDivHelper: function() {
    const divs = document.querySelectorAll('.super-smash-div-helper');
    divs.forEach(div => div.remove());
  },

  handlePrevent(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  },

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
};
