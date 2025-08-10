// Person constructor
function Person(name) {
  this.name = name;
  this.parents = [];
  this.children = [];
}

// Start with one person: "You"
const rootPerson = new Person("You");

// Container for the tree display
const treeContainer = document.getElementById("tree-container");

// Render the whole tree inside the container
function renderTree() {
  treeContainer.innerHTML = ""; // Clear current

  // Recursive function to create nested lists
  function createPersonElement(person) {
    const li = document.createElement("li");
    li.className = "person";

    // Name display
    const nameSpan = document.createElement("span");
    nameSpan.textContent = person.name;
    li.appendChild(nameSpan);

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    // Add Parent button (max 2 parents)
    const addParentBtn = document.createElement("button");
    addParentBtn.textContent = "Add Parent";
    addParentBtn.onclick = () => {
      if (person.parents.length >= 2) {
        alert("This person already has two parents.");
        return;
      }
      const parentName = prompt("Enter parent's name:");
      if (parentName && parentName.trim()) {
        const parent = new Person(parentName.trim());
        // Link parent and child both ways
        person.parents.push(parent);
        parent.children.push(person);
        renderTree();
      } else {
        alert("Invalid name.");
      }
    };
    buttonsDiv.appendChild(addParentBtn);

    // Add Child button
    const addChildBtn = document.createElement("button");
    addChildBtn.textContent = "Add Child";
    addChildBtn.onclick = () => {
      const childName = prompt("Enter child's name:");
      if (childName && childName.trim()) {
        const child = new Person(childName.trim());
        // Link child and parent both ways
        person.children.push(child);
        child.parents.push(person);
        renderTree();
      } else {
        alert("Invalid name.");
      }
    };
    buttonsDiv.appendChild(addChildBtn);

    li.appendChild(buttonsDiv);

    // Show parents if any
    if (person.parents.length > 0) {
      const parentsUl = document.createElement("ul");
      parentsUl.className = "tree";
      for (const parent of person.parents) {
        parentsUl.appendChild(createPersonElement(parent));
      }
      li.appendChild(document.createTextNode("Parents:"));
      li.appendChild(parentsUl);
    }

    // Show children if any
    if (person.children.length > 0) {
      const childrenUl = document.createElement("ul");
      childrenUl.className = "tree";
      for (const child of person.children) {
        childrenUl.appendChild(createPersonElement(child));
      }
      li.appendChild(document.createTextNode("Children:"));
      li.appendChild(childrenUl);
    }

    return li;
  }

  // Create root UL and append the root person
  const rootUl = document.createElement("ul");
  rootUl.className = "tree";
  rootUl.appendChild(createPersonElement(rootPerson));
  treeContainer.appendChild(rootUl);
}

// Initial render
renderTree();
