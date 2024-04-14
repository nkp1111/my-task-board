import SignInForm from '@/components/auth/sign-in-form'
import sendToken from '@/lib/auth/setUserToken';
import { verifyUser } from '@/lib/auth/verifyUser';

export default function SignIn() {

  // create user and sign in 
  const handleSignIn = async (prevState: null, queryData: FormData) => {
    "use server";
    const username = queryData.get("username");
    const password = queryData.get("password");

    if (!username || !password) {
      return { error: "Please enter all required fields" }
    }

    const userInfo = {
      username, password,
    }

    const { user, error } = await verifyUser(userInfo);
    if (user) {
      const { error, token } = await sendToken(user);
      return { user, token }
    } else {
      return { error: String(error) }
    }
  }


  return (
    <main className='bg-slate-50 w-full flex flex-col'>
      <h1 className='text-3xl text-center mt-10 mb-2 font-medium uppercase'>Welcome</h1>
      <p className='text-center mt-1 mb-3 '>Sign in to your account here</p>

      <SignInForm handleSignIn={handleSignIn} />
    </main>
  )
}


