import { Center, Table } from "@mantine/core"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { mockData } from "./mockData"
type Props = {}

const ReactTableTest = ({ ...props }: Props) => {
  type IData = (typeof mockData)[0]

  const columnHelper = createColumnHelper<IData>()

  const defaultColumns = [
    columnHelper.accessor((row) => row.id, {
      id: "ID",
      header: () => <Center>ID</Center>,
      cell: (row) => <Center>{row.cell.getValue()}</Center>,
    }),
    columnHelper.group({
      header: "Name",
      columns: [
        columnHelper.accessor((row) => row.first_name, {
          header: "First Name",
        }),
        columnHelper.accessor((row) => row.last_name, {
          header: "Last Name",
        }),
      ],
    }),
  ]

  const table = useReactTable({
    columns: defaultColumns,
    data: mockData,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="ReactTableTest">
      ReactTableTest
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ReactTableTest
