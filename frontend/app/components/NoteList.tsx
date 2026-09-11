import { NoteProps } from "@/app/lib/notes.types";
import { NoteCard } from "./NoteCard";

const NoteList = ({ notes }: { notes: NoteProps[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          title={note.title}
          description={note.description}
          tags={note.tags}
          updatedAt={note.updatedAt}
          key={note.id}
          id={note.id}
        />
      ))}
    </div>
  );
};
export { NoteList };
