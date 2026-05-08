"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()
  const handleRegister = async () => {
    if (password === confirmPassword){
      try {
        const response = await fetch(
          "https://beacon-api-liart.vercel.app/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: name,
              registration_number: registrationNumber,
              password: password,
            }),
          },
        );

        // valida resposta
        if (!response.ok) {
          setError(true);

          return;
        }

        // só executa se  funcionar

        router.push("/auth/login");
      } catch (error: any) {
        console.log(error.message);
       
      }
    }else {
      setError(true)
    }
    
  };

  return (
    <main className="h-dvh bg-black flex items-center justify-center">
      <Card className="w-1/3 ">
        <CardHeader>Cadastro: </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              className="shadow-lg pl-2 h-7.5"
              type="name"
              onChange={(e) => setName(e.target.value)}
              id="registration_number"
              placeholder="Insira seu nome"
            />
          </div>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password">Matrícula</label>
            <input
              className="shadow-lg pl-2 h-7.5"
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm_password"
              placeholder="Confirme a senha"
            />
          </div>
          <Button onClick={handleRegister} className="mt-2">
            Enviar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
