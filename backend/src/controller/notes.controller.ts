import type { FastifyReply, FastifyRequest } from "fastify";
import { notesService } from "../services/notes.service.ts";
import type {
  ListNotesQuery,
  NoteIdParam,
  NotesRequestBody,
  UpdateNotes,
} from "../lib/notes.types.ts";

export async function list(
  req: FastifyRequest<{ Querystring: ListNotesQuery }>,
  reply: FastifyReply,
): Promise<void> {
  const notes = await notesService.list(req.query);
  return reply.code(200).send(notes);
}

export async function create(
  req: FastifyRequest<{ Body: NotesRequestBody }>,
  reply: FastifyReply,
) {
  const create = await notesService.create(req.body);
  return reply.code(200).send({
    data: create,
    message: "Note created successfully",
    status: "success",
  });
}

export async function update(
  req: FastifyRequest<{ Body: UpdateNotes }>,
  reply: FastifyReply,
) {
  try {
    const [update] = await notesService.updateNotes(req.body);
    if (update === 1) {
      return reply.code(200).send({ message: "Note updated successfully" });
    }
    if (update == 0) {
      return reply.code(400).send({ message: "Note not found" });
    }
  } catch (error) {
    console.log("error", error);
    return reply.code(500).send({ message: "Failed to update note" });
  }
}

export async function deleteNote(
  req: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply,
) {
  const { id } = req.body;
  await notesService.deleteNote(id);
  return reply.code(200).send({ message: "Note deleted successfully" });
}

export async function getNote(
  req: FastifyRequest<{ Params: NoteIdParam }>,
  reply: FastifyReply,
) {
  const { id } = req.params;
  const note = await notesService.getNote(id);
  if (!note) {
    return reply.code(404).send({ message: "Note note found" });
  }
  return reply
    .code(201)
    .send({
      data: note,
      message: "Note found successfully",
      status: "success",
    });
}
