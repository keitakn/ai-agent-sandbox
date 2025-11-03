// 絶対厳守：編集前に必ずAI実装ルールを読む

import {
  ThreadListItemPrimitive,
  ThreadListPrimitive,
  useAssistantState,
} from "@assistant-ui/react";
import { ArchiveIcon, PlusIcon } from "lucide-react";
import type { FC } from "react";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const THREAD_LIST_SKELETON_IDS = [
  "thread-skeleton-1",
  "thread-skeleton-2",
  "thread-skeleton-3",
  "thread-skeleton-4",
  "thread-skeleton-5",
] as const;

export const ThreadList: FC = () => (
  <ThreadListPrimitive.Root className="aui-root aui-thread-list-root flex flex-col items-stretch gap-1.5">
    <ThreadListNew />
    <ThreadListItems />
  </ThreadListPrimitive.Root>
);

const ThreadListNew: FC = () => (
  <ThreadListPrimitive.New asChild>
    <Button
      className="aui-thread-list-new flex items-center justify-start gap-1 rounded-lg px-2.5 py-2 text-start hover:bg-muted data-active:bg-muted"
      variant="ghost"
    >
      <PlusIcon />
      New Thread
    </Button>
  </ThreadListPrimitive.New>
);

const ThreadListItems: FC = () => {
  const isLoading = useAssistantState(({ threads }) => threads.isLoading);

  if (isLoading) {
    return <ThreadListSkeleton />;
  }

  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

const ThreadListSkeleton: FC = () => (
  <>
    {THREAD_LIST_SKELETON_IDS.map((skeletonId) => (
      <output
        aria-label="Loading threads"
        aria-live="polite"
        className="aui-thread-list-skeleton-wrapper flex items-center gap-2 rounded-md px-3 py-2"
        key={skeletonId}
      >
        <Skeleton className="aui-thread-list-skeleton h-[22px] flex-grow" />
      </output>
    ))}
  </>
);

const ThreadListItem: FC = () => (
  <ThreadListItemPrimitive.Root className="aui-thread-list-item flex items-center gap-2 rounded-lg transition-all hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-active:bg-muted">
    <ThreadListItemPrimitive.Trigger className="aui-thread-list-item-trigger flex-grow px-3 py-2 text-start">
      <ThreadListItemTitle />
    </ThreadListItemPrimitive.Trigger>
    <ThreadListItemArchive />
  </ThreadListItemPrimitive.Root>
);

const ThreadListItemTitle: FC = () => (
  <span className="aui-thread-list-item-title text-sm">
    <ThreadListItemPrimitive.Title fallback="New Chat" />
  </span>
);

const ThreadListItemArchive: FC = () => (
  <ThreadListItemPrimitive.Archive asChild>
    <TooltipIconButton
      className="aui-thread-list-item-archive mr-3 ml-auto size-4 p-0 text-foreground hover:text-primary"
      tooltip="Archive thread"
      variant="ghost"
    >
      <ArchiveIcon />
    </TooltipIconButton>
  </ThreadListItemPrimitive.Archive>
);
