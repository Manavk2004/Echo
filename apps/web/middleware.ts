import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/test",
]);

const isOrgFreeRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-out(.*)",
    "/org-selection(.*)"
])

export default clerkMiddleware(async (auth, req) => {
    console.log(' MIDDLEWARE IS RUNNING!', req.nextUrl.pathname)
    
    const { userId, orgId} = await auth()
    
    console.log(' Middleware Debug:', {
        path: req.nextUrl.pathname,
        userId: !!userId,
        orgId: !!orgId,
        isPublic: isPublicRoute(req),
        isOrgFree: isOrgFreeRoute(req)
    })
    
    if(!isPublicRoute(req)){
        console.log("inside public route!!!!!!!!")
        await auth.protect()
    }

    if (userId && !orgId && !isOrgFreeRoute(req)){
        console.log('🚀 REDIRECTING to org-selection')
        const searchParams = new URLSearchParams({ redirectUrl: req.url})

        const orgSelection = new URL(
            `/org-selection?${searchParams.toString()}`,
            req.url
        )

        return NextResponse.redirect(orgSelection)
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