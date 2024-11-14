const menuList = [
  {
    label: "Home",
    handler: () => console.log("Home"),
  },
  {
    label: "About",
    handler: () => console.log("About"),
  },
  {
    label: "Contact",
    handler: () => console.log("Contact"),
  },
  {
    label: "Services",
    handler: () => console.log("Services"),
  },
];

const ddTrigger = document.querySelector(".ddTrigger");
const ddMenu = document.querySelector(".ddMenu");
let focusIndex = null;

(function () {
  menuList.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.innerText = item.label;
    menuItem.classList.add("ddItem");
    menuItem.addEventListener("click", item.handler);
    ddMenu.appendChild(menuItem);
  });
})();

function updateFocus(focusIndex) {
  const itemElementList = document.querySelectorAll(".ddItem");
  itemElementList.forEach((item, index) => {
    if (index === focusIndex) {
      item.classList.add("ddItem-focus");
    } else {
      item.classList.remove("ddItem-focus");
    }
  });
}

function setMenuPosition() {
  const ddTriggerRect = ddTrigger.getBoundingClientRect();
  const spaceX = window.innerWidth - ddTriggerRect.left;
  const ddMenuWidth = 200;
  const spaceY = window.innerHeight - ddTriggerRect.bottom;
  const ddMenuHeight = menuList.length * 30;
  if (spaceX < ddMenuWidth) {
    ddMenu.classList.remove("ddMenu-left");
    ddMenu.classList.add("ddMenu-right");
  } else {
    ddMenu.classList.remove("ddMenu-right");
    ddMenu.classList.add("ddMenu-left");
  }

  if (spaceY < ddMenuHeight) {
    ddMenu.classList.remove("ddMenu-bottom");
    ddMenu.classList.add("ddMenu-top");
  } else {
    ddMenu.classList.remove("ddMenu-top");
    ddMenu.classList.add("ddMenu-bottom");
  }
}

function removeFocusedItem() {
  focusIndex = null;
  updateFocus(focusIndex);
}

ddTrigger.addEventListener("click", () => {
  if (ddMenu.classList.contains("ddMenu-inactive")) {
    setMenuPosition();
  }
  ddMenu.classList.toggle("ddMenu-inactive");
  removeFocusedItem();
});

ddTrigger.addEventListener("mousedown", (e) => e.stopPropagation());

document.addEventListener("mousedown", (e) => {
  if (!ddMenu.contains(e.target)) {
    ddMenu.classList.add("ddMenu-inactive");
  }
});

ddTrigger.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    if (focusIndex === null) {
      focusIndex = 0;
    } else {
      focusIndex = focusIndex + 1 < menuList.length ? focusIndex + 1 : 0;
    }
    updateFocus(focusIndex);
  } else if (e.key === "ArrowUp") {
    if (focusIndex === null) {
      focusIndex = menuList.length - 1;
    } else {
      focusIndex = focusIndex - 1 >= 0 ? focusIndex - 1 : menuList.length - 1;
    }
    updateFocus(focusIndex);
  } else if (e.key === "Enter" || e.key === " ") {
    if (focusIndex !== null) {
      menuList[focusIndex].handler();
      removeFocusedItem();
    }
  }
});
