"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, type SignInInput } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 2 characters.",
  }),
});

function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
    setLoading(true);
    handleSignIn({
      username: value.email,
      password: value.password,
    });
  };

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        router.push("/");
      }
      // nextStep will use later on
    } catch (error) {
      console.log("error signing in", error);
    } finally {
      setLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-col items-center ">
        <div>
          <img src="/assets/images/logo.svg" alt="logo" />
        </div>
        <div className="mb-5 mt-8">
          <h3 className="text-3xl font-bold">Log in to your account</h3>
          <p className="text-[#7878A3] text-base mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 w-1/2 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Email or Username
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="shad-input"
                    ref={ref}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label"> Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" className="shad-input" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={loading}
          >
            {loading ? <Loader /> : <>Log in</>}
          </Button>
        </form>

        <div className="mt-4">
          <p className="text-base">
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-bold text-[#877EFF] ">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
}

export default Signup;
