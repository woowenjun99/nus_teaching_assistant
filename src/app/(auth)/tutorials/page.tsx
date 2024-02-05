import { Card } from "~/components/ui/card";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Page() {
  // Redirect the user to the login page if the user is not authenticated
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  // Fetch all the modules associated with the user
  const tutorials = await api.tutorials.getUserTutorials.query({ offset: 0 });

  return (
    <main className="container max-w-md">
      {tutorials.map((tutorial) => {
        return <Card key={tutorial.courseCode}></Card>;
      })}
    </main>
  );
}
