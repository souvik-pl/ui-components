const button = document.querySelector("button");

function throttle(fn, delay) {
  let isFnCallAllowed = true;
  return function () {
    if (!isFnCallAllowed) return;
    fn();
    isFnCallAllowed = false;
    setTimeout(() => {
      isFnCallAllowed = true;
    }, delay);
  };
}

function clickHandler() {
  console.log("button clicked");
}

const throttledClick = throttle(clickHandler, 1000);

button.addEventListener("click", throttledClick);
