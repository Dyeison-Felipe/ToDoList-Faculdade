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
    <div>
      <h1>ReactJS + Firebase</h1>

      <h2>Usuários</h2>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="text-slate-950"
      />

      <label>Senha:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="text-slate-950"
      />

      <button onClick={NewUser}>Cadastrar</button>
    </div>
  )
}
