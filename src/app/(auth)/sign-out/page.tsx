"use client";
import { useEffect } from "react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

function SignOut() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    } finally {
      router.push("/");
    }
  }

  useEffect(() => {
    let iscalled = true;
    if (iscalled) handleSignOut();
    return () => {
      iscalled = false;
    };
  }, []);

  return null;
}

export default SignOut;
