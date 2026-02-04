"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { createSession } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (!auth) {
        setError("Firebase Auth not initialized");
        return;
    }
    
    setIsPending(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      const response = await createSession(idToken);
      if (response.success) {
        router.push("/admin");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during sign in");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Sign in with Google to access the management system.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
          <Button 
            onClick={handleLogin} 
            className="w-full" 
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Continue with Google"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
