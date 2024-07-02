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
import { date } from "zod";

const Home = () => {
  // const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const [transactionList, settransactionList] = useState([{
    amount: 0,
    date: date,
    description: "",
    title: "",
    type: "",
    userid: "",
  },])
  async function signout() {
    await signOut(auth).then(
      () => navigate('/login')
    )
  }

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "transaction"));
    let list:any = [] 
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    });
    settransactionList(list)
    console.log(transactionList,"Kamal")
  }

  useEffect(() => {
    getData()
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
    </>
  )
}

export default Home