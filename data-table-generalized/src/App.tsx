import { House, houseList } from "./data/house-data";
import { User, userList } from "./data/user-data";
import { ColumnDef, DataTable } from "./DataTable";

const userTableColumns: ColumnDef<User> = [
  {
    key: "id",
    label: "ID",
    renderCell: (user: User) => <span>{user.id}</span>,
  },
  {
    key: "name",
    label: "Name",
    renderCell: (user: User) => <span>{user.name}</span>,
  },
  {
    key: "age",
    label: "Age",
    renderCell: (user: User) => <span>{user.age}</span>,
  },
  {
    key: "occupation",
    label: "Occupation",
    renderCell: (user: User) => <span>{user.occupation}</span>,
  },
];

const houseTableColumns: ColumnDef<House> = [
  {
    key: "id",
    label: "ID",
    renderCell: (house: House) => <span>{house.id}</span>,
  },
  {
    key: "street",
    label: "Street",
    renderCell: (house: House) => <span>{house.street}</span>,
  },
  {
    key: "city",
    label: "City",
    renderCell: (house: House) => <span>{house.city}</span>,
  },
  {
    key: "state",
    label: "State",
    renderCell: (house: House) => <span>{house.state}</span>,
  },
  {
    key: "zip",
    label: "Zip",
    renderCell: (house: House) => <span>{house.zip}</span>,
  },
  {
    key: "builtYear",
    label: "Built Year",
    renderCell: (house: House) => <span>{house.builtYear}</span>,
  },
];

const App = () => {
  return (
    <div>
      <h2>Table 1</h2>
      <DataTable<User> data={userList} columns={userTableColumns} />
      <h2>Table 2</h2>
      <DataTable data={houseList} columns={houseTableColumns} />
    </div>
  );
};

export default App;
