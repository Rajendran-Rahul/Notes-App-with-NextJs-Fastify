import Link from "next/link";
import { fetchData, get_note } from "@/api";
import { ApiResponse } from "@/lib/schema/notes.types";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { DeleteNote } from "@/components/notes/DeleteNote";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let note;
  try {
    const res = await fetchData<ApiResponse>(`${get_note}/${id}`);
    note = res.data;
  } catch (err) {
    console.error("err", err);
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to notes
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/notes/${id}/edit`}
            className="text-sm border rounded px-3 py-1.5 hover:bg-gray-50"
          >
            Edit
          </Link>
          <DeleteNote id={Number(id)} variant="button" />
        </div>
      </div>
      {note && (
        <>
          <h1 className="text-3xl font-semibold">{note.title}</h1>

          <p className="text-base whitespace-pre-wrap text-gray-700">
            {note.description}
          </p>

          {note.tags && note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {note.updatedAt ? (
            <p className="text-xs text-muted-foreground">
              Last updated {new Date(note?.updatedAt).toLocaleDateString()}
            </p>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
