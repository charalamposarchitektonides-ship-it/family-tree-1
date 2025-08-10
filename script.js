function Person(name) {
  this.name = name;
  this.parents = [];
  this.children = [];
}

const rootPerson = new Person("You");
const treeContainer = document.getElementById("tree-container");

function renderTree() {
  treeContainer.innerHTML = "";

  function createPersonElement(person) {
    const li = document.createElement("li");
    li.className = "person";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = person.name;
    li.appendChild(nameSpan);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

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
        person.parents.push(parent);
        parent.children.push(person);
        renderTree();
      } else {
        alert("Invalid name.");
      }
    };
    buttonsDiv.appendChild(addParentBtn);

    const addChildBtn = document.createElement("button");
    addChildBtn.textContent = "Add Child";
    addChildBtn.onclick = () => {
      const childName = prompt("Enter child's name:");
      if (childName && childName.trim()) {
        const child = new Person(childName.trim());
        person.children.push(child);
        child.parents.push(person);
        renderTree();
      } else {
        alert("Invalid name.");
      }
    };
    buttonsDiv.appendChild(addChildBtn);

    li.appendChild(buttonsDiv);

    // Show parents as simple list of names (no recursion)
    if (person.parents.length > 0) {
      const parentsDiv = document.createElement("div");
      parentsDiv.style.marginTop = "6px";
      parentsDiv.style.fontStyle = "italic";
      parentsDiv.textContent = "Parents: " + person.parents.map(p => p.name).join(", ");
      li.appendChild(parentsDiv);
    }

    // Show children recursively
    if (person.children.length > 0) {
      const childrenUl = document.createElement("ul");
      childrenUl.className = "tree";
      for (const child of person.children) {
        childrenUl.appendChild(createPersonElement(child));
      }
      li.appendChild(childrenUl);
    }

    return li;
  }

  const rootUl = document.createElement("ul");
  rootUl.className = "tree";
  rootUl.appendChild(createPersonElement(rootPerson));
  treeContainer.appendChild(rootUl);
}

renderTree();
