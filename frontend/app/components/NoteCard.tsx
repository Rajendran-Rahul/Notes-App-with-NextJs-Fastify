import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoteProps } from "@/app/lib/notes.types";

const palette = [
  { bg: "var(--color-note-amber)", text: "#7A4E00" },
  { bg: "var(--color-note-sage)", text: "#1F4A34" },
  { bg: "var(--color-note-terracotta)", text: "#7A2E1F" },
  { bg: "var(--color-note-lavender)", text: "#3E3269" },
  { bg: "var(--color-note-sky)", text: "#1E4A66" },
  { bg: "var(--color-note-sand)", text: "#5C4526" },
];

const colorFor = (id: number) => palette[id % palette.length];

export function NoteCard({
  title,
  description,
  tags,
  updatedAt,
  id,
}: NoteProps) {
  const { bg, text } = colorFor(Number(id));

  return (
    <Card
      className="border-none cursor-pointer transition-colors duration-200"
      style={{ backgroundColor: bg, color: text }}
    >
      <CardHeader>
        <CardTitle className="line-clamp-1 text-2xl" style={{ color: text }}>
          {title}
        </CardTitle>
        <CardDescription
          className="line-clamp-2 text-base"
          style={{ color: text, opacity: 0.75 }}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {(tags ?? []).map((tag: string) => (
          <Badge
            key={tag}
            variant="secondary"
            style={{ backgroundColor: "rgba(255,255,255,0.5)", color: text }}
          >
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="text-xs" style={{ color: text, opacity: 0.65 }}>
        Updated {new Date(updatedAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
}
