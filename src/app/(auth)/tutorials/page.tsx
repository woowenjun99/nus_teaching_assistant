import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function Page() {
  // Redirect the user to the login page if the user is not authenticated
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  return (
    <main className="container w-full">
      <h1 className="py-2 text-2xl font-medium">Your Tutorials</h1>
      {/* For admin use only */}
      {session.user.isAdmin ? (
        <Link href="/admin/tutorials" passHref>
          <Button>Manage tutorials</Button>
        </Link>
      ) : null}
    </main>
  );
}
