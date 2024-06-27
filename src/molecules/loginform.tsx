
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase'
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    //username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(5, {
        message: "atleast 5 Charecter should be present"
    }),
})

const LoginForm = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            //username: "",
            email: "",
            password: "",
        },
    })

   async function onSubmit(values: z.infer<typeof formSchema>) {
           await signInWithEmailAndPassword(auth, values.email,values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
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
                                <Input placeholder="set password" {...field} type="password" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">LogIn</Button>
            </form>
        </Form>
    )
}

export default LoginForm