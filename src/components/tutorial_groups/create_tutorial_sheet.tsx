"use client";
import { z } from "zod";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "~/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";

export default function CreateTutorialSheet() {
  const { toast } = useToast();
  const { mutateAsync, isLoading } =
    api.tutorialGroups.createTutorialGroup.useMutation();
  const { refetch } = api.tutorialGroups.getUserTutorials.useQuery();

  const formSchema = z.object({
    courseCode: z.string(),
    courseOffering: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      await mutateAsync(values);
      await refetch();
      toast({
        title: "Success!",
        description: "A tutorial group has been created",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: (e as Error).message,
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Manage tutorials</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Create new tutorial</SheetTitle>
          <SheetDescription>Create a new tutorial group.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-2">
            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. CS2040C" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseOffering"
              render={({ field }) => (
                <FormItem className="py-4">
                  <FormLabel>Course Offering</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course offering" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AY22/23 Sem 2">
                        AY22/23 Sem 2
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create Tutorial"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
