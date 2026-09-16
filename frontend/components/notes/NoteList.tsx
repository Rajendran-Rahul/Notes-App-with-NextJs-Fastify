import { NoteProps } from "@/lib/schema/notes.types";
import { NoteCard } from "@/components/notes/NoteCard";

const NoteList = ({ notes }: { notes: NoteProps[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          title={note.title}
          description={note.description}
          tags={note.tags}
          updatedAt={note.updatedAt}
          id={note.id}
          key={note.id}
        />
      ))}
    </div>
  );
};
export { NoteList };
