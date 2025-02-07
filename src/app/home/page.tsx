"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'

function Hello() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Image src={session.user?.image} alt="lamo" width={100} height={100}/>
        <h1>Welcome, {session.user?.name}</h1>
        <h1>Your email is, {session.user?.email}</h1>
        <button  onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn("google")}
        className="text-lg bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg font-bold shadow-md ="
      >
        Get
        started
      </button>
    </>
  );
}

export default Hello;
