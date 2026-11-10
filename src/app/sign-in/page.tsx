"use client";

import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash, Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { string } from "better-auth";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });
      
      if (error) {
        toast.error(error.message || "Sign-in failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      toast.success("Signed in successfully.")
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    toast.success("Signed in successfully.")
  };

  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    toast.success("Signed in successfully.")
  };

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#F0F5F0] px-4 py-10 sm:py-12">
      <div className="w-full max-w-106.75">
        {/* Heading */}
        <header className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#202D24]">
            Sign In
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#758078]">
            Welcome back, now it&apos;s your time to create an event or join an event
          </p>
        </header>

        {/* Sign-in card */}
        <section className="rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-6 sm:p-6">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-[#27352B]">
                Email
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-[42px] w-full rounded-[10px] border border-[#DFE7DF] bg-transparent px-3 text-sm text-[#253128] outline-none transition focus-within:border-[#07883E]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={isVisible ? "text" : "password"}
              className="w-full"
              minLength={8}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-[#27352B]">
                Password
              </Label>

              <InputGroup className="flex h-[42px] w-full items-center overflow-hidden rounded-[10px] border border-[#DFE7DF]  focus-within:border-[#07883E]">
                <InputGroup.Input
                  placeholder="At least 8 characters"
                  type={isVisible ? "text" : "password"}
                  className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-[#253128] outline-none"
                />

                <InputGroup.Suffix className="pr-1">
                  <Button
                    type="button"
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((previous) => !previous)}
                    className="text-[#758078]"
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Sign-in button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-0.5 h-[42px] w-full rounded-[9px] bg-[#07883E] text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#067734]"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E1E7E1]" />

            <span className="text-xs text-[#566159]">Or</span>

            <div className="h-px flex-1 bg-[#E1E7E1]" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="tertiary"
              onPress={handleGoogleSignIn}
              className="h-[42px] min-w-0 rounded-[9px] border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#27352B] transition hover:bg-[#F0F5F0] sm:text-sm"
            >
              <Icon icon="devicon:google" className="size-4 shrink-0" />
              <span>Continue with Google</span>
            </Button>

            <Button
              type="button"
              variant="tertiary"
              onPress={handleGithubSignIn}
              className="h-[42px] min-w-0 rounded-[9px] border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#27352B] transition hover:bg-[#F0F5F0] sm:text-sm"
            >
              <Icon icon="mdi:github" className="size-4 shrink-0" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          {/* Sign-up link */}
          <p className="mt-4 text-center text-sm text-[#465149]">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#07883E] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </section>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#758078] transition hover:text-[#07883E]"
          >
            ← Return to the home page
          </Link>
        </div>
      </div>
    </main>
  );
}