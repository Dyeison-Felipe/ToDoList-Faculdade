"use client";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase-config";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useAuth();

  async function signOutUser() {
    await signOut(auth);
    setCurrentUser(null);
  }

  return (
    <nav className="w-full h-36 flex justify-around items-center border-b border-black bg-gray-100">
      <h1>
        <Link href="/" className="text-gray-800  font-bold text-2xl">TO-DO-LIST</Link>
      </h1>

      <ul className=" w-64 flex justify-around items-center font-bold">
        {!currentUser ? (
          <>
            <Link
              href="/login"
              className="border border-black text-center w-28 rounded-sm bg-zinc-300 hover:bg-zinc-400"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="border border-black text-center w-28 rounded-sm bg-zinc-300 hover:bg-zinc-400"
            >
              Cadastro
            </Link>
          </>
        ) : (
          <>
            <ul className="w-full flex flex-col justify-around items-center">
              <span>Bem-vindo</span>
              <button
                onClick={signOutUser}
                className="border border-black text-center w-40 rounded-lg bg-zinc-300 hover:bg-zinc-400"
              >
                Sair
              </button>
            </ul>
          </>
        )}
      </ul>
    </nav>
  );
}
