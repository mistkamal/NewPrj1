import React from 'react'
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

const Home = () => {
  return (
    <>
      <h1>Expanse Tracker</h1>
      
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