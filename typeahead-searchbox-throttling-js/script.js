const input = document.querySelector(".input-js");
const ddMenu = document.querySelector(".ddMenu-js");
let abortController;

function throttle(fn, delay) {
  let isAPICallAllowed = true;
  return function (query) {
    if (!isAPICallAllowed) return;
    fn(query);
    isAPICallAllowed = false;
    setTimeout(() => {
      isAPICallAllowed = true;
    }, delay);
  };
}

async function makeAPICall(query) {
  if (abortController) abortController.abort();
  abortController = new AbortController();
  const url = `https://dummyjson.com/products/search?q=${query}`;
  const response = await fetch(url, {
    signal: abortController.signal,
  });
  const data = await response.json();
  const parsedData = data.products.map((product) => ({
    id: product.id,
    title: product.title,
  }));
  updateUI(parsedData);
}

function updateUI(productList) {
  ddMenu.innerHTML = "";
  openDropdown();
  productList.forEach((product) => {
    let li = document.createElement("li");
    li.innerText = product.title;
    li.setAttribute("data-product-id", product.id);
    li.classList.add("ddItem");
    li.addEventListener("click", (e) =>
      console.log(e.target.dataset.productId)
    );
    ddMenu.appendChild(li);
  });
}

function openDropdown() {
  ddMenu.classList.remove("ddMenu-inactive");
}

function closeDropdown() {
  ddMenu.classList.add("ddMenu-inactive");
}

const throttledSearch = throttle(makeAPICall, 400);

input.addEventListener("keydown", (e) => {
  const query = e.target.value.trim();
  if (!query) {
    closeDropdown();
    return;
  }
  throttledSearch(query);
});

input.addEventListener("focus", () => openDropdown());

(function () {
  document.addEventListener("mousedown", (e) => {
    if (!ddMenu.contains(e.target)) {
      closeDropdown();
    }
  });
})();
