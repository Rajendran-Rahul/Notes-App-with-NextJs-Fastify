import { get_note, fetchData } from "@/api";
import { NoteList } from "@/components/notes/NoteList";
import { NoteProps } from "@/lib/schema/notes.types";

const Notes = async () => {
  const allNotes = await fetchData<NoteProps[]>(get_note);

  return (
    <main>
      {allNotes.length > 0 ? (
        <NoteList notes={allNotes} />
      ) : (
        <p className="text-muted-foreground">No notes yet.</p>
      )}
    </main>
  );
};
export default Notes;
