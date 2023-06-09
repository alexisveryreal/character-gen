import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "./ui/Form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  summonText: z.string().min(2, {
    message: "Summon text must be at least 2 characters.",
  }),
  emoji: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export const EntryForm = () => {
  const { toast } = useToast();

  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      summonText: "",
      emoji: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, console.log)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="summonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summon Text</FormLabel>
              <FormControl>
                <Input placeholder="summon text here" {...field} />
              </FormControl>
              <FormDescription>
                This is the text that will be inside the summon circle.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji</FormLabel>
              <FormControl>
                <Input placeholder="any emoji here" {...field} />
              </FormControl>
              <FormDescription>
                This is the emoji that wil make up the summon circle.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
