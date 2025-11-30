"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório."),
    email: z.email("E-mail inválido."),
    password: z.string().min(8, "Senha inválida."),
    passwordConfirmation: z.string().min(8, "Senha inválida."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,

      fetchOptions: {
        onSuccess: () => router.push("/"),
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado.");
            return form.setError("email", {
              message: "E-mail já cadastrado.",
            });
          }

          toast.error(error.error.message);
        },
      },
    });
  }

  return (
    <Card className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Criar conta</CardTitle>
        <CardDescription className="text-zinc-400">
          Crie sua conta no DevBarros.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium rounded-lg"
            >
              Criar conta
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignUpForm;
