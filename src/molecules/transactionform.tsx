
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { auth, db } from '../lib/firebase'
//import { useNavigate } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "../components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "../lib/utils"
import { format } from "date-fns"
import { collection, addDoc } from "firebase/firestore";

const formSchema = z.object({
    title: z.string().min(2, { message: "Minimum 2 Character required" }),
    description: z.string().optional(),
    amount: z.string().transform((v) => Number(v) || 0),
    transactiontype: z.string(),
    date: z.date(),
})

const TransactionForm = () => {
    //const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            amount: 0,
            transactiontype: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values, auth.currentUser)
        const docRef = await addDoc(collection(db, "transaction"), {
            userid: auth.currentUser?.uid,
            title: values.title,
            description: values.description,
            amount: values.amount,
            type: values.transactiontype,
            date: values.date,
        });
        console.log("Document written with ID: ", docRef.id);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="enter title" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="enter description" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="enter amount" {...field} type="number" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="transactiontype"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Select Transaction Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Income" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Income
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Expanse" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Expanse
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of Transaction</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground")}>
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Add Transaction</Button>
            </form>
        </Form>
    )
}

export default TransactionForm