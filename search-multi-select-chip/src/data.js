const allData = [
  {
    id: "1",
    name: "John",
  },
  {
    id: "2",
    name: "Jane",
  },
  {
    id: "3",
    name: "Jill",
  },
  {
    id: "4",
    name: "Jack",
  },
  {
    id: "5",
    name: "Leena",
  },
  {
    id: "6",
    name: "Lucy",
  },
  {
    id: "7",
    name: "Mary",
  },
  {
    id: "8",
    name: "Mike",
  },
  {
    id: "9",
    name: "Nancy",
  },
  {
    id: "10",
    name: "Olivia",
  },
  {
    id: "11",
    name: "Patrick",
  },
  {
    id: "12",
    name: "Quincy",
  },
  {
    id: "13",
    name: "Rachel",
  },
  {
    id: "14",
    name: "Steve",
  },
  {
    id: "15",
    name: "Tom",
  },
];

export const getSearchResults = (queryString) => {
  const lowercaseQuery = queryString.toLowerCase();
  return allData.filter((data) =>
    data.name.toLowerCase().includes(lowercaseQuery)
  );
};
