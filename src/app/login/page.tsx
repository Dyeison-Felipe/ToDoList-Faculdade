"use client";
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

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/Lib/firebase-config";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const [detailsUser, setDetailsUser] = useState({});
  const [message, setMessage] = useState<string | null>(null);
  const [validation, setValidation] = useState<"success" | "error" | null>(
    null
  );

  async function loginUser(event: React.FormEvent) {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        setMessage("Login executado com suceso");
        setValidation("success");
        setUser(true);
        setDetailsUser({
          uid: value.user.uid,
          email: value.user.email,
        });

        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        setValidation("error");
        setMessage("ocorreu algum error");
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-sm w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Acessar</CardTitle>
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
          <form onSubmit={loginUser} className="space-y-4">
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
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
