/**
 * Auth (Clerk) yalnızca anahtarlar tanımlıysa devreye girer.
 * Bu sayede anahtarlar Vercel'e eklenmeden de site sorunsuz build/deploy olur.
 */
export const authEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
