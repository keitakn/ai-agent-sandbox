// 絶対厳守：編集前に必ずAI実装ルールを読む

"use client";

import { Slottable } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type TooltipIconButtonProps = ComponentPropsWithRef<typeof Button> & {
  tooltip: string;
  side?: "top" | "bottom" | "left" | "right";
};

export const TooltipIconButton = ({
  children,
  tooltip,
  side = "bottom",
  className,
  ref: buttonRef,
  ...rest
}: TooltipIconButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        {...rest}
        className={cn("aui-button-icon size-6 p-1", className)}
        ref={buttonRef}
      >
        <Slottable>{children}</Slottable>
        <span className="aui-sr-only sr-only">{tooltip}</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent side={side}>{tooltip}</TooltipContent>
  </Tooltip>
);

TooltipIconButton.displayName = "TooltipIconButton";
