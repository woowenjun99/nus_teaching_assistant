import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import dynamic from "next/dynamic";
import Tutorials from "~/components/tutorial_groups/tutorials";
const CreateTutorialSheet = dynamic(
  () => import("../../../components/tutorial_groups/create_tutorial_sheet"),
);

export default async function Page() {
  // Redirect the user to the login page if the user is not authenticated
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  return (
    <main className="container flex w-full flex-col">
      <h1 className="py-2 text-2xl font-medium">Your Tutorials</h1>
      <Tutorials />

      {/* For admin use only */}
      <div>{session.user.isAdmin ? <CreateTutorialSheet /> : null}</div>
    </main>
  );
}
