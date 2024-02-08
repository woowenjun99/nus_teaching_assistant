import { api } from "~/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from "../ui/alert-dialog";

export default async function Tutorials() {
  const tutorials = await api.tutorialGroups.getUserTutorials.query();

  return (
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
                <CardDescription className="py-2 text-sm">
                  {tutorial.courseOffering}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  {tutorial.teachingAssistant ? (
                    <Badge className="bg-green-500 text-white">Teaching</Badge>
                  ) : null}

                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="link" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right">
                        <DropdownMenuItem>
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertDialogTrigger>Delete</AlertDialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        Are you absolutely sure?
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        This action cannot be undone. All students in the
                        tutorial group will be removed and an email will be sent
                        out.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>No tutorials found</>
      )}
    </div>
  );
}
