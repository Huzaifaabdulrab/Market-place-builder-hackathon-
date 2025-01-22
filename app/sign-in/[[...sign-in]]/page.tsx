import { SignIn} from '@clerk/nextjs'

export default function SingUp() {
  return (
    <>
    <div className='flex justify-center items-center lg:mt-44 md:24 mt-20'>
    <SignIn  />
    </div>
    </>

  )
}