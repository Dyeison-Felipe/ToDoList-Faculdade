"use client";
import { auth } from "@/Lib/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [validation, setValidation] = useState<"success" | "error" | null>(null);

  async function NewUser(event: React.FormEvent) {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setValidation("success");
        setMessage("Usuário cadastrado com sucesso");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          setValidation("error");
          setMessage("Senha muito fraca");
        } else if (error.code === "auth/email-already-in-use") {
          setValidation("error");
          setMessage("Este email já existe!");
        }
      });
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-sm w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar sua conta.
          </CardDescription>
          {message && (
            <div
              className={`mb-4 text-center p-2 rounded-md ${
                validation === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={NewUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
>>>>>>> f3be4ee00430ae5464c310cf05060e8651cf6e42
}
