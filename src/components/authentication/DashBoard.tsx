"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function DashBoard() {
  const { data: session } = useSession();

  return (
    <div>
      <p>name: {session?.user?.name}</p>
      <p>email: {session?.user?.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
