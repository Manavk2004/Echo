"use client"

import { useMutation, useQuery } from "convex/react"
import { Authenticated, Unauthenticated } from "convex/react"
import { api } from "@workspace/backend/convex/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { OrganizationSwitcher, SignInButton,UserButton } from "@clerk/nextjs"

export default function Page() {
  const users = useQuery(api.user.getMany)
  const addUser = useMutation(api.user.add)
  
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>apps/web</p>
          <UserButton></UserButton>
          <OrganizationSwitcher 
            hidePersonal={true}
          />
          <Button onClick={() => addUser()}>Add</Button>
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed in!</p>
        <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  )
}
