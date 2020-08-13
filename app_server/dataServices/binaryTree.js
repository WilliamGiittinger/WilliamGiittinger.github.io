/* Node class for use in BinarySearchTree */
class Node {
    constructor(animal) {
        this.animal = animal;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {

    constructor() {
        this.root = null;
    }

    /* Helper methods and data */
    orderedList = [];

    /* If tree is empty, animal is root node.
       Else call insertNode for leaf placement */
    insert(animal) {
        // Create node with animal data
        let newNode = new Node(animal);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(currentNode, newNode) {

        /* Check for left node placement */
        if (newNode.animal.zooId < currentNode.animal.zooId) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this.insertNode(currentNode.left, newNode);
            }
        } 
        
        /* Else check for right node placement */
        else {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this.insertNode(currentNode.right, newNode);
            }
        }
    }

    remove(animal) {
        this.root = this.removeNode(this.root, animal)
    }

    removeNode(currentNode, zooId) {

        /* Search for node to be removed */
        if (currentNode === null) {                                                 // Tree is empty or has no more leafs to search
            return null;
        }

        else if (zooId < currentNode.animal.zooId) {                                // Id given is less than that of the current node
            currentNode.left = this.removeNode(currentNode.left, zooId);
            return currentNode;
        }

        else if (zooId > currentNode.animal.zooId) {                                // Id given is greater than that of the current node
            currentNode.right = this.removeNode(currentNode.right, zooId);
            return currentNode;
        }

        /* Actual node removal steps */
        else {
            
            if (currentNode.left === null && currentNode.right === null) {          // Current node has no leafs
                currentNode = null;
                return currentNode;
            }

            else if (currentNode.left === null) {                                   // Current node has left leaf
                currentNode = currentNode.right;
                return currentNode;
            }

            else if (currentNode.right === null) {                                  // Current node has right leaf
                currentNode = currentNode.left;
                return currentNode;
            }

            let minNodeRight = this.findMinNode(currentNode.right);                 // Current node has 2 leafs 
            /* replace right leaf with min right node and then delete the previous position of that node */
            currentNode.animal = minNodeRight.animal;
            currentNode.right = this.removeNode(currentNode.right, minNodeRight.animal.zooId);
            return currentNode;
        };
    }

    clearOrderedList() {
        this.orderedList = [];
        return true;
    }

    inOrder(currentNode) {
        if (currentNode !== null) {
            this.inOrder(currentNode.left);
            this.orderedList.push(currentNode.animal);
            this.inOrder(currentNode.right);
        };
    }

    getOrderedList() {
        return this.orderedList;
    }

    findMinNode(currentNode) {
        /* If left leaf is null, then this node is the min node */
        if (currentNode.left === null) {
            return currentNode;
        } else {
            return this.findMinNode(currentNode.left);
        };
    }

    getRootNode() {
        return this.root;
    }

    search(currentNode, zooId) {
        if (currentNode === null) {                             // Tree is empty or no match
            return null;
        }

        else if (zooId < currentNode.animal.zooId) {            // Given zooId is less than current node
            return this.search(currentNode.left, zooId);
        }

        else if (zooId > currentNode.animal.zooId) {            // Given zooId is greater than current node
            return this.search(currentNode.right, zooId);
        }

        else {                                                  // This node matches given search zooId
            return currentNode;
        };
    }
}

module.exports = {
    BinaryTree
}