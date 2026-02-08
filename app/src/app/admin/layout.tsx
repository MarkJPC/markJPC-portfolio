import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-md border border-gh-border bg-gh-card px-4 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-gh-text">Admin Dashboard</h1>
          <Link href="/" className="text-sm text-gh-link hover:underline">
            Back to site
          </Link>
        </div>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
