import { NoteForm } from "@/components/notes/NoteForm";
import { fetchData, get_note } from "@/api";
import { ApiResponse } from "@/lib/schema/notes.types";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetchData<ApiResponse>(`${get_note}/${id}`);
  const note = res.data

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit note</h1>
      <NoteForm
        mode="edit"
        noteId={id}
        defaultValues={{
          title: note?.title || "",
          description: note?.description,
          tag: note?.tags ?? [],
        }}
      />
    </div>
  );
}
