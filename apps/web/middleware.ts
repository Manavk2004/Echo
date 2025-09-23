import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/test",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, } = await auth()
    if(!isPublicRoute(req)){
        await auth.protect()
    }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}


//Middleware is the first place the system goes to in order to proceed. If the middleware catches an issue, it is redirected. Having middleware is important because it serves as the first line of defense in a sense