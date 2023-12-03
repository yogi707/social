"use client";
import React, { useState, useRef, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  confirmSignUp,
  type ConfirmSignUpInput,
  signUp,
  autoSignIn,
} from "aws-amplify/auth";
import SignupVerification from "@/components/SignupVerification";
import { useRouter } from "next/navigation";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  name: string;
};

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email("not a valid email"),
  password: z.string().min(5, {
    message: "Password must be at least 2 characters.",
  }),
});

const SIGN_UP_FORM = "signupform";
const SIGN_UP_CONFIRMATION = "signupconfirmation";

function Signup() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(SIGN_UP_FORM);

  const handleSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
    handleSignUp({
      email: value.email,
      password: value.password,
      username: value.username,
      name: value.name,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUpConfirmation({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      if (isSignUpComplete && nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        handleAutoSignIn();
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  async function handleSignUp({
    username,
    password,
    email,
    name,
  }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      console.log(userId, isSignUpComplete, nextStep);
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setStep(SIGN_UP_CONFIRMATION);
      }
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
      console.log(signInOutput);
      router.push("/");
      // handle sign-in steps
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (step === SIGN_UP_CONFIRMATION)
    return (
      <SignupVerification
        handleConfirmation={handleSignUpConfirmation}
        values={{
          username: form.getValues().username,
          email: form.getValues().email,
        }}
      />
    );

  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-col items-center">
        <div className="mb-10">
          <img src="/assets/images/logo.svg" alt="logo" />
        </div>
        <div>
          <h3 className="text-3xl font-bold"> Create a new account</h3>
          <p className="text-[#7878A3] text-base">
            To use snapgram, Please enter your details
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 w-1/2 mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input {...field} type="text" className="shad-input" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="text" className="shad-input" />
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
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" className="shad-input" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            Sign up
          </Button>
        </form>

        <div className="mt-4">
          <p className="text-base">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-bold text-[#877EFF] ">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
}

export default Signup;
