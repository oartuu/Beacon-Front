"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  registration_number: string;
  password: string;
};

export default function page() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const onSubmit = async (formData: Inputs) => {
    try {
      const response = await fetch(
        "https://beacon-api-liart.vercel.app/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            registration_number: formData.registration_number,
            password: formData.password,
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
        <CardHeader className="text-2xl font-bold">Login: </CardHeader>
        {error ? (
          <div className="px-4">
            <p>matrícula ou senha invalidas</p>
          </div>
        ) : null}
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="registration_number">Matrícula</label>
            <input
              className="shadow-md border rounded-lg px-4 py-2 "
              type="text"
              {...register("registration_number", { required: true })}
              placeholder="Insira sua matrícula de professor"
            />
            {errors.registration_number && (
              <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                Este campo é obrigatório
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md relative">
              {showPassword ? (
                <Eye
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
                />
              ) : (
                <EyeClosed
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
                />
              )}
              <input
                className="w-full"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "A senha é obrigatória",
                })}
                placeholder="Digite sua Senha"
              />
              {errors.password && (
                <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <Button onClick={handleSubmit(onSubmit)} className="mt-2">
            Enviar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
