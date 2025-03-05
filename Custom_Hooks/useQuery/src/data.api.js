export const getData = async (userId) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
};
