const input = document.querySelector(".input-js");
const ddMenu = document.querySelector(".ddMenu-js");
let abortController;

function debounce(fn, delay) {
  let timer;
  return function (query) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(query);
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

const debouncedSearch = debounce(makeAPICall, 400);

input.addEventListener("keyup", (e) => {
  const query = e.target.value.trim();
  if (!query) {
    closeDropdown();
    return;
  }
  debouncedSearch(query);
});

input.addEventListener("focus", () => openDropdown());

(function () {
  document.addEventListener("mousedown", (e) => {
    if (!ddMenu.contains(e.target)) {
      closeDropdown();
    }
  });
})();
