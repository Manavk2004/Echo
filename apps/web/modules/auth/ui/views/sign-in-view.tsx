import { SignIn } from "@clerk/nextjs"

export const SignInView = () => {
    return(
        <SignIn routing="hash"/>
    )
}


//The reason here we have [[...sign-in]] is because Clerk JS could have some routes after the /sign-in/ that we cannot directly know/account for