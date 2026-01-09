import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/dashboard',
  '/api/course',
  '/courses',
  '/courses/1',
  '/courses/2',
  '/courses/3',
  '/courses/4',
  '/courses/(.*)/(.*)',  //  dynamic exercise routes
  '/api/admin/save-exercises',
  '/courses/(.*)/(.*)/(.*)',  // dynamic exercise routes
  '/api/exercise',
  '/api/course' 
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
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