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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useCopyToClipboard } from "~/lib/hooks";
import { ToastAction } from "./ui/toast";
import { generateSquare } from "~/lib/utils";

const formSchema = z.object({
  text: z
    .string()
    .min(2, {
      message: "Summon text must be at least 2 characters.",
    })
    .max(20, { message: "Text cannot be more than 20 characters long." }),
  character: z.string().max(1, { message: "only one character please." }),
});

type FormSchema = z.infer<typeof formSchema>;

export const EntryForm = () => {
  const { toast } = useToast();
  const [value, copy] = useCopyToClipboard();

  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      text: "",
      character: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    const square = generateSquare(values.character, 24, values.text);

    toast({
      title: "Generated:",
      description: (
        <pre className="mt-2 flex flex-col rounded-md bg-slate-950 p-4">
          {/* {circleString} */}
          <code className="text-white">{square}</code>
          <Button
            onClick={() => {
              void copy(square);
            }}
          >
            Copy to clipboard
          </Button>
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="summon text here" {...field} />
              </FormControl>
              <FormDescription>
                This is the text that will be inside the square.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="character"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character</FormLabel>
              <FormControl>
                <Input placeholder="any character here" {...field} />
              </FormControl>
              <FormDescription>
                This is the chracter that wil make up the summon square.
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
