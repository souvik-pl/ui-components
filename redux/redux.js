const createStore = (reducer) => {
  if (typeof reducer !== "function") {
    throw new Error("Reducer should be a function.");
  }

  let currentState;
  let callbackList = [];

  const getState = () => {
    return currentState;
  };

  const subscribe = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback should be a function.");
    }

    callbackList.push(callback);

    return () => {
      callbackList = callbackList.filter((c) => c !== callback);
    };
  };

  const dispatch = (action) => {
    if (typeof action !== "object" || action === null) {
      throw new Error("Actions must be plain objects");
    }

    if (typeof action.type === "undefined") {
      throw new Error("Actions must have a type");
    }

    currentState = reducer(currentState, action);
    callbackList.forEach((cb) => cb(currentState));

    return action;
  };

  // initialize state by dispatching a special action
  dispatch({ type: "@@redux/INIT" });

  return {
    getState,
    subscribe,
    dispatch,
  };
};

const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "ADD":
      return { ...state, count: state.count + (action.payload || 0) };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const unsubscribe = store.subscribe((state) => {
  console.log("State changed -> ", state);
});

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "ADD", payload: 10 });

unsubscribe();

store.dispatch({ type: "INCREMENT" }); // no log
store.dispatch({ type: "INCREMENT" }); // no log
console.log("Final -> ", store.getState());
