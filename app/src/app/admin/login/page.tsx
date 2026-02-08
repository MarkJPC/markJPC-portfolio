import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function LoginPage() {
  return (
    <div className="mx-auto mt-20 max-w-sm">
      <div className="rounded-md border border-gh-border bg-gh-card p-6">
        <h1 className="mb-6 text-center text-xl font-bold text-gh-text">
          Admin Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
