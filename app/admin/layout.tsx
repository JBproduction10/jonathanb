import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminProviders from "./providers";
import Sidebar from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "Admin — Portfolio Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // The login page renders its own centered layout with no sidebar, so we
  // let it through here and rely on middleware.ts for the actual gate on
  // every other /admin route.
  return (
    <AdminProviders>
      {session ? (
        <div className="flex min-h-screen bg-base-950">
          <Sidebar />
          <main className="flex-1 p-6 sm:p-10">{children}</main>
        </div>
      ) : (
        children
      )}
    </AdminProviders>
  );
}
