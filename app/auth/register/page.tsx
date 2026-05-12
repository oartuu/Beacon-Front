"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  registration_number: string;
  password: string;
  confirm_password: string;
};

export default function page() {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
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

  const handleShowConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };
  const onSubmit = async (formData: Inputs) => {
    if (formData.password === formData.confirm_password) {
      try {
        const response = await fetch(
          "https://beacon-api-liart.vercel.app/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: formData.name,
              registration_number: formData.registration_number,
              password: formData.password,
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
    } else {
      setError(true);
    }
  };

  return (
    <main className="h-dvh bg-black flex items-center justify-center">
      <Card className="md:w-1/3 w-[95%]">
        <CardHeader className="text-2xl font-bold">Cadastro: </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              className="shadow-md border rounded-lg px-4 py-2 "
              type="text"
              {...register("name", { required: true })}
              placeholder="Insira seu nome"
            />
            {errors.name && (
              <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                Este campo é obrigatório
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="registration_number">Matrícula</label>
            <input
              className="shadow-md border rounded-lg px-4 py-2 "
              type="text"
              {...register("registration_number", { required: true })}
              placeholder="Insira sua matrícula"
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
            </div>
            {errors.password && (
              <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password">Confirme a Senha</label>
            <div className="[&>input]:border [&>input]:rounded-lg [&>input]:px-4 [&>input]:py-2 [&>input]:shadow-md relative">
              {showConfirmPassword ? (
                <Eye
                  onClick={handleShowConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
                />
              ) : (
                <EyeClosed
                  onClick={handleShowConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer w-5 h-5"
                />
              )}
              <input
                className="w-full"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirm_password", {
                  required: "A senha é obrigatória",
                })}
                placeholder="Confirme sua Senha"
              />
            </div>
            {errors.confirm_password && (
              <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
          <Button onClick={handleSubmit(onSubmit)} className="mt-2">
            Enviar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
