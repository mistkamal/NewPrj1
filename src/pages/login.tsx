import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
  
import LoginForm from '../molecules/loginform'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 mt-16" >
        <h1 className='text-4xl font-bold'>Login Page</h1>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>My Profile Login</CardTitle>
            <CardDescription>Please Provide Username Password</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm></LoginForm>
          </CardContent>
          <CardFooter>
            <Link to={"/register"}><u>New Here? Create an Account</u></Link>
          </CardFooter>
        </Card>

      </main>
  )
}

export default Login