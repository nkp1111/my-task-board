import BackgroundStyle from '@/components/auth/backgroundStyle';
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
    <main className='bg-white w-full flex flex-1 no-scrollbar md:flex-row flex-col-reverse h-full'>
      <div className='min-w-64 xl:w-1/3 lg:w-1/2 md:w-2/3 px-5 sm:px-16 py-5 flex flex-col'>
        <h1 className='text-2xl mt-6 mb-2 font-bold text-secondary-content md:text-start text-center'>Welcome</h1>
        <p className='mt-1 mb-6'>Sign in to your account here</p>
        <SignInForm handleSignIn={handleSignIn} />
      </div>
      <div className='md:flex-1 md:h-auto h-64'>
        <BackgroundStyle />
      </div>
    </main>
  )
}


