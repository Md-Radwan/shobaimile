"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
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
import Link from "next/link";
import { type FormEvent, useState } from "react";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("The two passwords do not match.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setIsLoading(true);

    try {
      const { data: resData, error } = await signUp.email({
        name: String(data.name),
        email: String(data.email),
        password: String(data.password),
      });

      if (error) {
        setErrorMessage(error.message || "Account could not be created");
        return;
      }

      console.log("Signup successful:", resData);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(error.message || "Could not sign up with Google");
    }
  };

  const handleGithubSignIn = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(error.message || "Could not sign up with GitHub");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#202b23] sm:py-10">
      <div className="mx-auto w-full max-w-101">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
            Create an account
          </h1>

          <p className="mt-1 text-sm text-[#778078]">
            Sign In now. It&apos;s your time to create an event or join an event
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="w-full"
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "The name must be at least 3 characters long.";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                Name
              </Label>

              <Input
                placeholder="For example: Rahim Uddin"
                className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10"
              />

              <FieldError />
            </TextField>

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
                  return "Enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                Email
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) {
                  return "The password must be at least 8 characters long.";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Provide at least one uppercase English letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Provide at least one number";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                Password
              </Label>

              <InputGroup className="h-10 w-full rounded-lg border border-[#dfe7df]">
  <InputGroup.Input
    name="password"
    type={isVisible ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="At least 8 characters"
    className="min-w-0 px-3 text-sm"
  />

  <InputGroup.Suffix className="pe-1">
    <Button
      type="button"
      isIconOnly
      aria-label={isVisible ? "Hide password" : "Show password"}
      size="sm"
      variant="ghost"
      onPress={() => setIsVisible((prev) => !prev)}
    >
      {isVisible ? (
        <Eye className="size-4" />
      ) : (
        <EyeSlash className="size-4" />
      )}
    </Button>
  </InputGroup.Suffix>
</InputGroup>

              {/* <InputGroup className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  // value={password}
                  onChange={(value) => setPassword(value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="min-w-0 px-3 text-sm"
                />

                <InputGroup.Suffix className="pe-1">
                  <Button
                    type="button"
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((prev) => !prev)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup> */}

              <FieldError />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              name="confirmPassword"
              className="w-full"
              validate={(value) => {
                if (!value) {
                  return "Re-enter the password";
                }
                if (value !== password) {
                  return "The two passwords do not match.";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                Confirm password
              </Label>

              <Input
                type={isVisible ? "text" : "password"}
                value={confirmPassword}
                // onChange={setConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার লিখুন"
                className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10"
              />

              <FieldError />
            </TextField>

            {/* Error Message */}
            {errorMessage && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Signup Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-0.5 h-10 w-full rounded-lg bg-[#07883e] text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#067533] disabled:opacity-60"
            >
              {isLoading ? "Please wait..." : "Create an account"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe5df]" />
            <span className="text-xs text-[#737b74]">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe5df]" />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onPress={handleGoogleSignIn}
              variant="tertiary"
              className="h-10 min-w-0 rounded-lg border border-[#dfe7df] bg-transparent px-2 text-xs font-semibold text-[#273129] hover:bg-[#f1f5f1] sm:text-sm"
            >
              <Icon icon="devicon:google" className="shrink-0 text-base" />
              <span>Continue with Google</span>
            </Button>

            <Button
              type="button"
              onPress={handleGithubSignIn}
              variant="tertiary"
              className="h-10 min-w-0 rounded-lg border border-[#dfe7df] bg-transparent px-2 text-xs font-semibold text-[#273129] hover:bg-[#f1f5f1] sm:text-sm"
            >
              <Icon icon="mdi:github" className="shrink-0 text-base" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-sm text-[#343d35]">
            Do you have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#07883e] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-[#7a837b] transition hover:text-[#07883e]"
          >
            ← Return to the home page
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;