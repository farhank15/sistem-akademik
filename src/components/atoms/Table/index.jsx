const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full overflow-hidden border border-gray-700 rounded-lg shadow-md cursor-pointer bg-neutral-dark">
        <thead className="bg-primary text-secondary-light">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left whitespace-nowrap">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-neutral-light">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-neutral hover:bg-neutral-dark">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 border-b border-gray-700 whitespace-nowrap"
                >
                  {typeof column.accessor === "function"
                    ? column.accessor(row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
