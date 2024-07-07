import { ColumnDef } from "@tanstack/react-table"
import { Button } from "./button"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

async function deletetransaction(title:any){
  await deleteDoc(doc(db, "transaction", title));
  console.log('kamal ' + title)
}

export type Transaction = {
    amount: number,
    description: string,
    title: string,
    type: string,
    userid: string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "type",
    header: "Income/Expanse",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const title = row.original.title
      return (
        <Button onClick={()=>deletetransaction(title)} className="bg-red-600 text-white">Delete</Button>
      )
    },
  },
]
