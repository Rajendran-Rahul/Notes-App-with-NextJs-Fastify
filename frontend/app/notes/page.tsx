import { get_note, fetchData } from "@/api";
import { NoteList } from "@/components/notes/NoteList";
import { NoteProps } from "@/lib/schema/notes.types";

const Notes = async () => {
  const allNotes = await fetchData<NoteProps[]>(get_note);  

  return (
    <main>
      {allNotes && allNotes.length && <NoteList notes={allNotes ?? []} />}
    </main>
  );
};
export { Notes };
