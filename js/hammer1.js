const hammer = {
  activated: false,

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
  },


  deactivateTargetMode: function() {
    document.removeEventListener('mousedown', hammer.execute, true);
    document.removeEventListener('mouseup', hammer.handlePrevent, true);
    document.removeEventListener('click', hammer.handlePrevent, true);
    hammer.removeDivHelper();
  },

  execute: function(e) {
    let mouse = hammer.getMousePos(e);
    if (e.target.tagName === 'CANVAS') {
        hammer.draw(e.target, mouse.x, mouse.y);
    } else {
        hammer.overlayCanvas(e, mouse.x, mouse.y);
    }
    hammer.handlePrevent(e);
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

  getMousePos: function(e) {
    const rect = e.target.getBoundingClientRect();
    const scaleX = e.target.offsetWidth / rect.width;
    const scaleY = e.target.offsetHeight / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
  },

  overlayCanvas: function(e, x, y) {
      const canvas = document.createElement('canvas');
      canvas.className = 'super-smash-canvas';
      canvas.sibling = e.target;

      canvas.width = e.target.offsetWidth;
      canvas.height = e.target.offsetHeight;

      canvas.style.position = 'absolute';
      canvas.style.border = 'solid 1px red';
      canvas.style.top = `${e.target.offsetTop}px`;
      canvas.style.left = `${e.target.offsetLeft}px`;

      canvas.style.padding = '0';
      canvas.style.margin = '0';

      canvas.zIndex = '5000';
      e.target.parentNode.insertBefore(canvas, e.target.nextSibling);

      hammer.draw(canvas, x, y);
  },

  draw: function(canvas, x, y) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
  },

  handlePrevent: function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};
