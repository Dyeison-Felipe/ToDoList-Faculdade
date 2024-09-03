'use client'
import { auth } from "@/Lib/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";

export default function Page() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<boolean>(false);
  const [detailsUser, setDetailsUser] = useState({});

  async function NewUser() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        alert("Usuário cadastrado com sucesso");
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert("Senha muito fraca");
        } else if (error.code === 'auth/email-already-in-use') {
          alert("este email já existe!!!");
        };
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-black">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cadastre-se</h1>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={NewUser}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Cadastrar
        </button>
      </div>
    </div>

  )
}
