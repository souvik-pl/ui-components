import React, { useReducer } from "react";

const ACTIONS = {
  UPDATE_NAME: "UPDATE_NAME",
  UPDATE_EMAIL: "UPDATE_EMAIL",
  UPDATE_PHONE: "UPDATE_PHONE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case ACTIONS.UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case ACTIONS.UPDATE_PHONE:
      return {
        ...state,
        phone: action.payload.phone,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    phone: "",
  });

  const nameChangeHandler = (e) => {
    dispatch({ type: ACTIONS.UPDATE_NAME, payload: { name: e.target.value } });
  };

  const emailChangeHandler = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_EMAIL,
      payload: { email: e.target.value },
    });
  };

  const phoneChangeHandler = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_PHONE,
      payload: { phone: e.target.value },
    });
  };

  return (
    <div>
      <form>
        <label>
          <p>Name</p>
          <input type="text" value={state.name} onChange={nameChangeHandler} />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={state.email}
            onChange={emailChangeHandler}
          />
        </label>
        <label>
          <p>Phone number</p>
          <input
            type="number"
            value={state.phone}
            onChange={phoneChangeHandler}
          />
        </label>
      </form>
      <div>
        <p>Name: {state.name}</p>
        <p>Email: {state.email}</p>
        <p>Phone number: {state.phone}</p>
      </div>
    </div>
  );
}
