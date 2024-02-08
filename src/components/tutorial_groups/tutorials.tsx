"use client";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { MoreVertical, Delete, Loader2 } from "lucide-react";
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
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Skeleton } from "../ui/skeleton";

export default function Tutorials({ isAdmin }: { isAdmin: boolean }) {
  const {
    data: tutorials,
    isLoading,
    refetch,
  } = api.tutorialGroups.getUserTutorials.useQuery();
  const { mutateAsync, isLoading: buttonLoading } =
    api.tutorialGroups.deleteTutorialGroup.useMutation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

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
                        {isAdmin ? (
                          <DropdownMenuItem>
                            <AlertDialogTrigger className="flex w-full flex-row justify-between">
                              Delete
                              <Delete className="my-auto h-4 w-4" />
                            </AlertDialogTrigger>
                          </DropdownMenuItem>
                        ) : null}
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
                        <AlertDialogAction asChild>
                          <Button
                            onClick={async () => {
                              await mutateAsync({
                                courseCode: tutorial.courseCode,
                                courseOffering: tutorial.courseOffering,
                                teachingAssistant: tutorial.teachingAssistant,
                              });

                              await refetch();
                            }}
                            disabled={buttonLoading || isLoading}
                          >
                            {buttonLoading ? <Loader2 /> : "Continue"}
                          </Button>
                        </AlertDialogAction>
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
