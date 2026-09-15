import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoteProps } from "@/lib/schema/notes.types";

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
  
  return (
    <Card
      className={`border-none cursor-pointer transition-colors duration-200 ${bg} ${text}`}
    >
      <CardHeader>
        <CardTitle className={`line-clamp-1 text-2xl ${text}`}>
          {title}
        </CardTitle>
        <CardDescription
          className={`line-clamp-2 text-base opacity-75 ${text}`}
        >
          {description}
        </CardDescription>
      </CardHeader>
      {tags && tags.length && (
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
