import { SignUp } from "@clerk/nextjs"

const Page = () => {
    return(
        <SignUp />
    )
}

export default Page

//The reason here we have [[...sign-in]] is because Clerk JS could have some routes after the /sign-out/ that we cannot directly know/account for
