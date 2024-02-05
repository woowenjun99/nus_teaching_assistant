import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";





export default async function Page() {
  // Check whether login and has admin rights
  const session = await getServerAuthSession();
  if (!session || !session.user.isAdmin) redirect("/tutorials");

  const allTutorials = await api.tutorials.getAllTutorials.query({ offset: 0 });

  return <main></main>;
}
