export type House = {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  builtYear: number;
};

export const houseList: House[] = [
  {
    id: 1,
    street: "123 Maple St",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    builtYear: 1990,
  },
  {
    id: 2,
    street: "456 Oak St",
    city: "Lincoln",
    state: "NE",
    zip: "68510",
    builtYear: 1985,
  },
  {
    id: 3,
    street: "789 Pine St",
    city: "Madison",
    state: "WI",
    zip: "53703",
    builtYear: 2000,
  },
  {
    id: 4,
    street: "101 Cedar St",
    city: "Columbus",
    state: "OH",
    zip: "43215",
    builtYear: 1978,
  },
  {
    id: 5,
    street: "102 Elm St",
    city: "Dover",
    state: "DE",
    zip: "19901",
    builtYear: 1995,
  },
  {
    id: 6,
    street: "103 Birch St",
    city: "Salem",
    state: "OR",
    zip: "97301",
    builtYear: 1980,
  },
  {
    id: 7,
    street: "104 Spruce St",
    city: "Albany",
    state: "NY",
    zip: "12207",
    builtYear: 1965,
  },
  {
    id: 8,
    street: "105 Walnut St",
    city: "Hartford",
    state: "CT",
    zip: "06103",
    builtYear: 1992,
  },
  {
    id: 9,
    street: "106 Chestnut St",
    city: "Raleigh",
    state: "NC",
    zip: "27601",
    builtYear: 1988,
  },
  {
    id: 10,
    street: "107 Ash St",
    city: "Bismarck",
    state: "ND",
    zip: "58501",
    builtYear: 1975,
  },
];
