import { get_note, fetchData } from "@/app/api";
import { NoteList } from "@/app/components/NoteList";
import { NoteProps } from "@/app/lib/notes.types";

const Notes = async () => {
  const allNotes = await fetchData<NoteProps[]>(get_note);

  return (
    <main>
      {allNotes && allNotes.length && <NoteList notes={allNotes ?? []} />}
    </main>
  );
};
export { Notes };
