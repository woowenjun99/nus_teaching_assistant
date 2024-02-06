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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreateTutorialSheet() {
  const formSchema = z.object({
    courseCode: z.string(),
    courseOffering: z.string(),
    tutorialGroup: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Manage tutorials</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Create new tutorial</SheetTitle>
          <SheetDescription>
            Create a new tutorial group here. Do note that since we are an
            unofficial application, we will not be creating tutorials for all
            groups.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. CS2040C" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the course code manually as we do not want to fetch
                    all the data.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
