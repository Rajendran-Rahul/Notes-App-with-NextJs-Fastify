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
  { bg: "#EEEDFE", text: "#26215C" },
  { bg: "#E1F5EE", text: "#04342C" },
  { bg: "#FAECE7", text: "#4A1B0C" },
];

const colorFor = (id: number) => palette[id % palette.length];

export function NoteCard({
  title,
  description,
  tags,
  updatedAt,
  id,
}: NoteProps) {
    console.log(  updatedAt,
);
    
  const { bg, text } = colorFor(Number(id));
  return (
    <Card
      className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border-none"
      style={{ backgroundColor: bg, color: text }}
    >
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {(tags ?? []).map((tag: string) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Updated {(new Date(updatedAt).toLocaleDateString())}
      </CardFooter>
    </Card>
  );
}
