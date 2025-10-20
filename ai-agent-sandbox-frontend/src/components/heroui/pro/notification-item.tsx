"use client";

import { Avatar, Badge, Button, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

export type NotificationType = "default" | "request" | "file";

export type NotificationItem = {
  id: string;
  isRead?: boolean;
  avatar: string;
  description: string;
  name: string;
  time: string;
  type?: NotificationType;
};

export type NotificationItemProps = React.HTMLAttributes<HTMLDivElement> &
  NotificationItem;

const NotificationItem = React.forwardRef<
  HTMLDivElement,
  NotificationItemProps
>(
  (
    {
      children,
      avatar,
      name,
      description,
      type,
      time,
      isRead,
      className,
      ...props
    },
    ref
  ) => {
    /**
     * Defines the content for different types of notifications.
     */
    const contentByType: Record<NotificationType, React.ReactNode> = {
      default: null,
      request: (
        <div className="flex gap-2 pt-2">
          <Button color="primary" size="sm">
            Accept
          </Button>
          <Button size="sm" variant="flat">
            Decline
          </Button>
        </div>
      ),
      file: (
        <div className="flex items-center gap-2">
          <Icon
            className="text-secondary"
            icon="solar:figma-file-linear"
            width={30}
          />
          <div className="flex flex-col">
            <strong className="font-medium text-small">
              Brand_Logo_v1.2.fig
            </strong>
            <p className="text-default-400 text-tiny">3.4 MB</p>
          </div>
        </div>
      ),
    };

    return (
      <div
        className={cn(
          "flex gap-3 border-divider border-b px-6 py-4",
          {
            "bg-primary-50/50": !isRead,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="relative flex-none">
          <Badge
            color="primary"
            content=""
            isInvisible={isRead}
            placement="bottom-right"
            shape="circle"
          >
            <Avatar src={avatar} />
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-foreground text-small">
            <strong className="font-medium">{name}</strong>{" "}
            {description || children}
          </p>
          <time className="text-default-400 text-tiny">{time}</time>
          {type && contentByType[type]}
        </div>
      </div>
    );
  }
);

NotificationItem.displayName = "NotificationItem";

export default NotificationItem;
