export type ColumnDef<T> = {
  key: string;
  label: string;
  renderCell: (row: T) => React.ReactNode;
}[];

export const DataTable = <T,>({
  data,
  columns,
}: {
  data: Array<T>;
  columns: ColumnDef<T>;
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map(({ key, renderCell }) => (
                <td key={key}>{renderCell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
