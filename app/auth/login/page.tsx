'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function page() {
    const router = useRouter();
    const [registrationNumber, setRegistrationNumber] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)
    const handleLogin = async () => {
      try {
        const response = await fetch(
          "https://beacon-api-liart.vercel.app/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              registration_number: registrationNumber,
              password: password,
            }),
          },
        );

        const data = await response.json();

        // 🔥 valida resposta
        if (!response.ok) {
          setError(true);

          return;
        }

        // ✅ só executa se login funcionar
        localStorage.setItem("token", data.access_token);

        router.push("/");
      } catch (error: any) {
        console.log(error.message);
      }
    };

  return (
    <main className="h-dvh bg-black flex items-center justify-center">
      <Card className="w-1/3 ">
        <CardHeader>Login: </CardHeader>
        {error ? (
          <div className="px-4">
            <p>matrícula ou senha invalidas</p>
          </div>
        ) : null}
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="registration_number">Matrícula</label>
            <input
              className="shadow-lg pl-2 h-7.5"
              type="text"
              onChange={(e) => setRegistrationNumber(e.target.value)}
              id="registration_number"
              placeholder="Insira sua matrícula de professor"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              className="shadow-lg pl-2 h-7.5"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Insira sua senha"
            />
          </div>
          <Button onClick={handleLogin} className="mt-2">
            Enviar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
