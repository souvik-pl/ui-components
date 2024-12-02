import { useState } from "react";

const useArray = (arr) => {
  const [array, setArray] = useState(arr);

  const set = (newArr) => {
    setArray(newArr);
  };

  const push = (ele) => {
    setArray([...array, ele]);
  };

  const remove = (index) => {
    if (index >= 0 && index < array.length) {
      const arrCopy = [...array];
      arrCopy.splice(index, 1);
      setArray(arrCopy);
    }
  };

  const filter = (callback) => {
    const filteredArr = array.filter(callback);
    setArray(filteredArr);
  };

  const update = (index, newVal) => {
    const arrCopy = [...array];
    arrCopy[index] = newVal;
    setArray(arrCopy);
  };

  const clear = () => {
    setArray([]);
  };

  return {
    array,
    set,
    push,
    remove,
    filter,
    update,
    clear,
  };
};

export default useArray;
