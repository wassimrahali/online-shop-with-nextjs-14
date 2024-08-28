import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/'],  // Only the root path is public
});

export const config = {
  matcher: [
    // Explicitly protect the "/products" route
    '/(api|trpc)(.*)',
    // Apply middleware to all other routes except public routes and static files
    '/((?!_next|[^?]*\\.(?:html?|css|tsx|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/products'
  ],
};
