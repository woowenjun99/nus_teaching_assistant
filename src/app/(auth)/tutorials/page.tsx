import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Tutorials from "~/components/tutorial_groups/tutorials";
import CreateTutorialSheet from "~/components/tutorial_groups/create_tutorial_sheet";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  return (
    <main className="container flex w-full flex-col">
      <h1 className="py-2 text-2xl font-medium">Your Tutorials</h1>
      <div className="flex flex-col gap-4">
        <div>
          <CreateTutorialSheet />
        </div>
        <Tutorials isAdmin={session.user.isAdmin} />
      </div>
    </main>
  );
}
