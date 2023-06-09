import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

type ContainerProps = ComponentProps<"div">;

export const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}
      {...props}
    />
  );
};
