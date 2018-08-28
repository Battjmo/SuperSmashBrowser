
// declare activation settings
const toggle = document.body.getElementById('toggle');
let activated = false;

toggle.onclick = () => {
  if (activated) {
    activated = false;
  } else {
    activated = true;
    activateTargetMode();
  }
};

// activate target mode
const activateTargetMode = () => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.style.transition = 'all 2s';
    e.target.style.opacity = '0';
  });
};


// select children
const reverseBFT = (parent) => {
  const queue = [parent];
  const nodes = [];
  let node;
  while (queue.length) {
    node = queue.pop();
    nodes.unshift(node);

    for (let i = 0; i < node.children.length; i++) {
      queue.unshift(node.children[i]);
    }
  }
  return nodes;
};

// apply styling over children
const animate = (children, delay) => {
  if (children.length) {
    setTimeout(() => {
      children[0].style.opacity = '0';
      animate(children.slice(1), delay);
    }, delay);
  }
};


document.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
  e.target.style.transition = 'all 2s';
  e.target.style.fontSize = '0';
e.target.style.opacity = '0';
setTimeout(() => {
  e.target.style.width = '0';
  e.target.style.height = '0';
  setTimeout(() => e.target.style.display = 'none', 2000);
  }, 1000);
}, false);
