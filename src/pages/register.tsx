import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
  
import RegisterForm from '../molecules/registrationform'

const Register = () => {
  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 mt-16" >
        <h1 className='text-4xl font-bold'>New Registeration</h1>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>My Profile Login</CardTitle>
            <CardDescription>Please Provide Username Password</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm></RegisterForm>
          </CardContent>
        </Card>

      </main>
  )
}

export default Register