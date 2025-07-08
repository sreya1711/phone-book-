// Define a Node class to represent each contact
class ContactNode {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree class for managing the contacts
class PhonebookBST {
    constructor() {
        this.root = null;
    }

    // Insert a new contact into the BST
    insert(name, phone) {
        const newNode = new ContactNode(name, phone);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    // Helper method to insert a node
    _insertNode(node, newNode) {
        if (newNode.name < node.name) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else if (newNode.name > node.name) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Search for a contact by name
    search(name) {
        return this._searchNode(this.root, name);
    }

    // Helper method to search a node
    _searchNode(node, name) {
        if (node === null) {
            return null;
        }
        if (name < node.name) {
            return this._searchNode(node.left, name);
        } else if (name > node.name) {
            return this._searchNode(node.right, name);
        } else {
            return node;
        }
    }

    // Delete a contact by name
    delete(name) {
        this.root = this._deleteNode(this.root, name);
    }

    // Helper method to delete a node
    _deleteNode(node, name) {
        if (node === null) {
            return null;
        }
        if (name < node.name) {
            node.left = this._deleteNode(node.left, name);
        } else if (name > node.name) {
            node.right = this._deleteNode(node.right, name);
        } else {
            // Node to be deleted found
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                const minNode = this._findMin(node.right);
                node.name = minNode.name;
                node.phone = minNode.phone;
                node.right = this._deleteNode(node.right, minNode.name);
            }
        }
        return node;
    }

    // Helper method to find the minimum node
    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // In-order traversal to display all contacts
    inOrder() {
        const contacts = [];
        this._inOrderTraversal(this.root, contacts);
        return contacts;
    }

    // Helper method for in-order traversal
    _inOrderTraversal(node, contacts) {
        if (node !== null) {
            this._inOrderTraversal(node.left, contacts);
            contacts.push({ name: node.name, phone: node.phone });
            this._inOrderTraversal(node.right, contacts);
        }
    }
}

// Initialize the PhonebookBST instance
const phonebook = new PhonebookBST();

// Function to update the display
function updateDisplay() {
    const contacts = phonebook.inOrder();
    const contactsList = document.getElementById("contacts-list");
    contactsList.innerHTML = "";
    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = `Name: ${contact.name}, Phone: ${contact.phone}`;
        contactsList.appendChild(li);
    });
}

// Handle form submissions
document.getElementById("insert-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("insert-name").value;
    const phone = document.getElementById("insert-phone").value;
    phonebook.insert(name, phone);
    updateDisplay();
    document.getElementById("insert-name").value = "";
    document.getElementById("insert-phone").value = "";
});

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("search-name").value;
    const contact = phonebook.search(name);
    const resultElement = document.getElementById("search-result");
    if (contact) {
        resultElement.textContent = `Found: ${contact.name}, ${contact.phone}`;
    } else {
        resultElement.textContent = `Contact not found!`;
    }
});

document.getElementById("delete-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("delete-name").value;
    phonebook.delete(name);
    updateDisplay();
    document.getElementById("delete-name").value = "";
});

// Initial display update
updateDisplay();
