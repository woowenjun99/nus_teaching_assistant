import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
const CreateTutorialSheet = dynamic(() => import("./create_tutorial_sheet"));

export default async function Page() {
  // Redirect the user to the login page if the user is not authenticated
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  const tutorials = await api.tutorialGroups.getUserTutorials.query();

  return (
    <main className="container flex w-full flex-col">
      <h1 className="py-2 text-2xl font-medium">Your Tutorials</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {tutorials.length ? (
          <>
            {tutorials.map((tutorial) => (
              <Card
                key={
                  tutorial.courseCode +
                  tutorial.courseOffering +
                  tutorial.teachingAssistant
                }
              >
                <CardHeader>
                  <CardTitle>{tutorial.courseCode}</CardTitle>
                  <CardDescription className="py-2">
                    Offered in {tutorial.courseOffering}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {tutorial.teachingAssistant ? (
                    <Badge className="bg-green-500 text-white">Teaching</Badge>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>No tutorials found</>
        )}
      </div>
      {/* For admin use only */}
      <div>{session.user.isAdmin ? <CreateTutorialSheet /> : null}</div>
    </main>
  );
}
