import { DetailedHTMLProps, ReactNode, TdHTMLAttributes } from "react";

export function Tr(props: { isOdd?: boolean; children: ReactNode[] }) {
  return <tr className={"hover:bg-accent text-gray-100 ".concat(props.isOdd ? "bg-slate-700" : "bg-gray-800")}>{...props.children}</tr>
}
export function Td(props: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>) {

  return <td {...props} className="px-4 py-1 border-none text-[14px]">{props.children}</td>
}
export function Th(props: { children: ReactNode }) {
  return <th className="px-4 py-2 text-left border-none text-semibold text-[14px] uppercase">{props.children}</th>
}
export function Table(props: { children: ReactNode }) {
  return (<div className="overflow-x-auto rounded-lg border border-gray-700 w-full">
    <table className="min-w-full border-none rounded-lg shadow-sm rounded-lg">
      {props.children}
    </table>
  </div>)
}

