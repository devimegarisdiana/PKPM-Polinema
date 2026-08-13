import { ReactNode } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface Props<T extends { id: number }> {
  columns: Column<T>[];
  data: T[];
  onEdit: (row: T) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function AdminTable<T extends { id: number }>({
  columns, data, onEdit, onDelete, loading
}: Props<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        Memuat data...
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        Belum ada data.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700 max-w-xs">
                  {col.render
                    ? col.render(row)
                    : <span className="truncate block">{String((row as Record<string, unknown>)[col.key] ?? "—")}</span>
                  }
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => onEdit(row)}
                    className="p-1.5 text-gray-500 hover:text-[#0a2558] hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
