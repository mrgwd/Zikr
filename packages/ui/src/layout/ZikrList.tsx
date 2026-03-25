"use client";

import { cn } from "@workspace/lib/utils";
import { type Detections } from "@workspace/model/types";
import { buttonVariants } from "../components/button";

export default function ZikrList({
  list,
  LinkComponent = "a",
  href = "/zikr",
}: {
  list: Detections;
  LinkComponent?: React.ElementType;
  href?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(list)
        .filter(([_, zikr]) => zikr.render)
        .map(([id, zikr], index) => {
          return (
            <LinkComponent
              key={id}
              href={href + "/" + id}
              className={cn(
                "animate-fade w-full cursor-pointer font-bold opacity-0",
                buttonVariants({ variant: "secondary", size: "lg" }),
                zikr.count % 2 === 0 ? "shimmer-even" : "shimmer-odd",
              )}
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              {zikr.label}
              <span>{zikr.count}</span>
            </LinkComponent>
          );
        })}
    </div>
  );
}
