import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export function Header() {
  const { isSignedIn, userId } = useAuth();
  const { signOut } = useClerk();
  
  console.log('👤 Header rendering:', {
    isSignedIn,
    userId,
  });

  return (
    <header className="border-b">
      <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">
          DocTranslate
        </a>
        
        <nav className="flex items-center gap-4">
          <a href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
            Pricing
          </a>
          
          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
} 