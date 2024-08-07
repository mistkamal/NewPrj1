
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../lib/firebase'
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
    //username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(5, {
        message: "atleast 5 Charecter should be present"
    }),
    confirmpassword: z.string(),
}).refine((data)=>data.password === data.confirmpassword,{
    path:['confirmpassword'],
    message:"password Not Matched"
})

const RegisterForm = () => {

    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            //username: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
    })

  async function onSubmit(values: z.infer<typeof formSchema>) {
        //console.log(values)
        await createUserWithEmailAndPassword(auth,values.email,values.password)
        navigate("/login")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="enetr email" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="set password" {...field} type="password"/>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="reenter password" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    )
}

export default RegisterForm