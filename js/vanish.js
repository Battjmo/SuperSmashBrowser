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

    const static_wand = `*, *:hover { cursor: url(${vanish.wand1}), auto !important} `;
    const active_wand = `*:active { cursor: url(${vanish.wand2}), auto !important}`;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(static_wand + active_wand));
    document.getElementsByTagName('head')[0].appendChild(style);


    // document.body.style.cursor = `url(${vanish.wand}), auto`;
    // document.body.querySelectorAll('*').forEach(el => {
    //   el.style.cursor = `url(${vanish.wand}), auto`;
    // });
  },


  deactivateTargetMode: function() {
    document.removeEventListener('mousedown', vanish.removeEl, true);
    document.removeEventListener('mouseup', vanish.handlePrevent, true);
    document.removeEventListener('click', vanish.handlePrevent, true);
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



// class Vanish {
//   constructor() {
//     // this.toggle = document.body.getElementById('toggle-vanish');
//     this.activated = false;
//     this.allChildren = this.allChildren.bind(this);
//   }
//
//   toggleVanish() {
//     if (this.activated) {
//       this.activated = false;
//       this.deactivateTargetMode();
//     } else {
//       this.activated = true;
//       this.activateTargetMode();
//     }
//   }
//
//   activateTargetMode() {
//     document.addEventListener('click', this.vanishEl);
//   }
//
//   deactivateTargetMode() {
//     document.removeEventListener('click', this.vanishEl);
//   }
//
//   vanishEl(e) {
//     e.preventDefault();
//     console.log(e.target);
//     debugger;
//     const elements = this.allChildren(e.target);
//     this.animate(elements, 100);
//   }
//
//   allChildren(parent) {
//     const queue = [parent];
//     const nodes = [];
//     let node;
//     while (queue.length) {
//       node = queue.pop();
//       nodes.unshift(node);
//
//       for (let i = 0; i < node.children.length; i++) {
//         queue.unshift(node.children[i]);
//       }
//     }
//     return nodes;
//   }
//
//   animate(nodes, delay) {
//     if (nodes.length) {
//       Object.assign(nodes[0].style, {
//         transition: 'all 2s',
//         fontSize: '0',
//         opacity: '0'
//       });
//     	setTimeout(() => {
//         Object.assign(nodes[0].style, {width: '0', height: '0'});
//     		setTimeout(() => {
//           nodes[0].style.display = 'none';
//         }, 2000);
//       }, 1000);
//       this.animate(nodes.slice(1), delay);
//     }
//   }
// }
//
// const vanish = new Vanish;
// vanish.toggleVanish();
//
//
//

// // declare activation settings
// const toggle = document.body.getElementById('toggle');
// let activated = false;
//
// toggle.onclick = () => {
//   if (activated) {
//     activated = false;
//     // deactivateTargetMode();
//   } else {
//     activated = true;
//     activateTargetMode();
//   }
// };
//
//
// // activate target mode
// const activateTargetMode = () => {
//   document.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     e.target.style.transition = 'all 2s';
//     e.target.style.opacity = '0';
//   });
// };
//
//
// // select children
// const reverseBFT = (parent) => {
//   const queue = [parent];
//   const nodes = [];
//   let node;
//   while (queue.length) {
//     node = queue.pop();
//     nodes.unshift(node);
//
//     for (let i = 0; i < node.children.length; i++) {
//       queue.unshift(node.children[i]);
//     }
//   }
//   return nodes;
// };
//
// // apply styling over children
// const animate = (children, delay) => {
//   if (children.length) {
//     setTimeout(() => {
//       children[0].style.opacity = '0';
//       animate(children.slice(1), delay);
//     }, delay);
//   }
// };
//
//
// // document.addEventListener('click', (e) => {
// //   e.preventDefault();
// //   console.log(e.target);
// //   e.target.style.transition = 'all 2s';
// //   e.target.style.fontSize = '0';
// // e.target.style.opacity = '0';
// // setTimeout(() => {
// //   e.target.style.width = '0';
// //   e.target.style.height = '0';
// //   setTimeout(() => e.target.style.display = 'none', 2000);
// //   }, 1000);
// // }, false);
