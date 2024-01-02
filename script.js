function Node(arraydata){
    let data = arraydata;
    let left = null;
    let right = null;
    return {
        data, left, right
    };
}

function Tree(data) {
    return {root: buildTree(data)};
}


function buildTree(data, start=0, end = data.length-1) {
    if(start>end){
        return null;
    }
    else{
        let mid = Math.floor((start+end)/2);
        let node = Node(data[mid]); 

        node.left = buildTree(data, start, mid-1);
        node.right = buildTree(data, mid+1, end);

        return node;
    }
}


// function to console.log tree in a structured format
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


function insert(root, value){
  if(root === null){
    return Node(value);
  }
  if(root.value < value){
    root.left = insert(root.left, value);
  }
  else if(root.value > value){
    root.right = insert(root.right, value);
  }
  return root;
}

function deleteValue(root, value){
  if(root === null){
    return root;
  }
  if(value < root.data){
    root.left = deleteValue(root.left, value);
  }
  else if(value > root.data){
    root.right = deleteValue(root.right, value);
  }
  else{
    // case where both child nodes are null or 1 child is null
    if(root.left == null){
      return root.right;
    }
    else if(root.right == null){
      return root.left;
    }
    // case where both child nodes are non null
    root.data = getMin(root.right); // change the data to the next node in the array

    // delete the next node in the array in the bst
    root.right = deleteValue(root.right, root.data);
  }
  return root;
}

// function to get the minimum value in the right subtree of a bst for the case where the node to be deleted has 2 child nodes
function getMin(node){
  let minValue = node.data;
  while(node.left !== null){
    minValue = node.left.data;
    node = node.left;
  }
  return minValue;
}

