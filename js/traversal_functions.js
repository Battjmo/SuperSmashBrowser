
// Reverse Breadth First Traversal
// Returns an array of all nodes from bottom up right to left

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
