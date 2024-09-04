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
}
