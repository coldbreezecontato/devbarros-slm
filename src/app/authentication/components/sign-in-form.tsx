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

const formSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string().min(8, "Senha inválida!"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => router.push("/"),
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("E-mail não encontrado.");
            return form.setError("email", {
              message: "E-mail não encontrado.",
            });
          }

          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválidos.");
            form.setError("email", { message: "E-mail ou senha inválidos." });
            return form.setError("password", {
              message: "E-mail ou senha inválidos.",
            });
          }

          toast.error(ctx.error.message);
        },
      },
    });
  }

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Card className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Entrar</CardTitle>
        <CardDescription className="text-zinc-400">
          Faça login para continuar.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
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
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium rounded-lg"
            >
              Entrar
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleSignInWithGoogle}
              className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors rounded-lg flex gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78..." />
                <path fill="#34A853" d="M12 23c2.97 0..." />
                <path fill="#FBBC05" d="M5.84 14.09c-.22..." />
                <path fill="#EA4335" d="M12 5.38c1.62..." />
              </svg>
              Entrar com Google
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignInForm;
