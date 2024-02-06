import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import dynamic from "next/dynamic";
const CreateTutorialSheet = dynamic(() => import("./create_tutorial_sheet"));

export default async function Page() {
  // Redirect the user to the login page if the user is not authenticated
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  return (
    <main className="container w-full">
      <h1 className="py-2 text-2xl font-medium">Your Tutorials</h1>
      {/* For admin use only */}
      {session.user.isAdmin ? <CreateTutorialSheet /> : null}
    </main>
  );
}
