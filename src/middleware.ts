import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const authEnabled =
  !!process.env.CLERK_SECRET_KEY && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const isProtected = createRouteMatcher(["/hesabim(.*)", "/admin(.*)"]);

const clerk = clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

/** Anahtar yoksa Clerk devreye girmez; istekler olduğu gibi geçer. */
export default authEnabled ? clerk : () => NextResponse.next();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
