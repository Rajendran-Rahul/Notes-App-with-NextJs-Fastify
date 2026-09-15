import type { FastifyInstance } from "fastify";
import * as notesController from "../controller/notes.controller.ts";
import type {
  ListNotesQuery,
  NotesRequestBody,
  UpdateNotes,
  NoteIdParam
} from "../lib/notes.types.ts";

async function routes(notes: FastifyInstance) {
  notes.get<{ Querystring: ListNotesQuery }>("/", notesController.list);
  notes.get<{Params: NoteIdParam}>("/:id", notesController.getNote);
  notes.post<{ Body: NotesRequestBody }>("/create", notesController.create);
  notes.put<{ Body: UpdateNotes }>("/update", notesController.update);
  notes.delete<{ Body: { id: number } }>("/delete", notesController.deleteNote);
}

export default routes;
