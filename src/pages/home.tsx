import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from '../components/ui/button'
import TransactionForm from '../molecules/transactionform'
import { signOut } from "firebase/auth";
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { DataTable } from "../components/transactionDatatable";
import { columns } from "../components/ui/transactioncolumns";
import { useStore } from '../store'

const Home = () => {
  // const [loggedIn, setLoggedIn] = useState(false)
  const {loggedIn,logOut}:any = useStore()
  const navigate = useNavigate()
  const [transactionList, settransactionList] = useState([{
    amount: 0,
    description: "",
    title: "",
    type: "",
    userid: "",}])

  async function signout() {
    logOut()
    await signOut(auth).then(
      () => navigate('/login')
    )
  }

  useEffect(() => {
        if(!loggedIn)
        {
          navigate("/login")
        }

        const getdata = async() => {

          // const q = query(collection(db, "transaction"), where("type","==","Income"))  
          // const querySnapshot = await getDocs(q);
        const querySnapshot = await getDocs(collection(db, "transaction"));
        let list: any = [] 
        querySnapshot.forEach((doc) => {
          list.push(doc.data())
        });
        settransactionList(list)
    }
    getdata()
    console.log(transactionList, "Kamal")
  }, [])

  return (
    <>
      <h1>Expanse Tracker</h1>
      <Button onClick={signout}>SignOut</Button>
      <Dialog>
        <DialogTrigger><Button>New Transaction</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Manage your finances, keep updating transaction
            </DialogDescription>
          </DialogHeader>
          <TransactionForm></TransactionForm>
        </DialogContent>
      </Dialog>

      <DataTable columns={columns} data={transactionList}></DataTable>

    </>
  )
}

export default Home