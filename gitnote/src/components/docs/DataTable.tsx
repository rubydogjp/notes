interface Props {
  headers: string[];
  rows: string[][];
}

export default function DataTable({ headers, rows }: Props) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-amber-100 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-amber-50 dark:bg-gray-800/60">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-amber-100 dark:border-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b last:border-b-0 border-amber-100/60 dark:border-gray-800">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
