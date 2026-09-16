"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoteProps } from "@/lib/schema/notes.types";
import { DeleteNote } from "@/components/notes/DeleteNote";
import Link from "next/link";

const palette = [
  {
    bg: "bg-note-amber",
    text: "text-note-amber-text",
    badgeBg: "bg-note-amber-badge",
  },
  {
    bg: "bg-note-sage",
    text: "text-note-sage-text",
    badgeBg: "bg-note-sage-badge",
  },
  {
    bg: "bg-note-terracotta",
    text: "text-note-terracotta-text",
    badgeBg: "bg-note-terracotta-badge",
  },
  {
    bg: "bg-note-lavender",
    text: "text-note-lavender-text",
    badgeBg: "bg-note-lavender-badge",
  },
  {
    bg: "bg-note-sky",
    text: "text-note-sky-text",
    badgeBg: "bg-note-sky-badge",
  },
  {
    bg: "bg-note-sand",
    text: "text-note-sand-text",
    badgeBg: "bg-note-sand-badge",
  },
];

const colorFor = (id: number) => palette[id % palette.length];

export function NoteCard({
  title,
  description,
  tags,
  updatedAt,
  id,
}: NoteProps) {
  const { bg, text, badgeBg } = colorFor(Number(id));
  const noteLink = `/notes/${id}`;

  return (
    <Card
      className={`border-none relative transition-colors duration-200 ${bg} ${text}`}
    >
      <CardHeader className="flex items-center gap-4">
        <CardTitle className={`line-clamp-1 text-2xl ${text} flex-1`}>
          <Link
            href={noteLink}
            className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {title}
          </Link>
        </CardTitle>
        <CardAction className="relative z-10">
          <DeleteNote id={Number(id)} variant="icon" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription
          className={`line-clamp-2 text-base opacity-75 ${text}`}
        >
          {description}
        </CardDescription>
      </CardContent>
      {tags && tags.length > 0 && (
        <CardContent className="flex flex-wrap gap-2 items-center">
          {tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`${badgeBg} ${text}`}
            >
              {tag}
            </Badge>
          ))}
        </CardContent>
      )}
      <CardFooter className={`text-xs opacity-65 ${text}`}>
        Updated {new Date(updatedAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
}
