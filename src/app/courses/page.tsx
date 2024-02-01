import { Card, CardTitle, CardHeader } from "~/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  // Redirect the user to the login page if the user is not authenticated
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  // Fetch all the modules associated with the user

  return (
    <main className="container max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <Link href="/api/auth/signin">Login</Link>
        </CardHeader>
      </Card>
    </main>
  );
}
