import { Notes } from "../models/Notes.ts";
import { Op, literal } from "sequelize";
import type { WhereOptions } from "sequelize";
import { sequelize } from "../config/database.ts";
import type {
  ListNotesQuery,
  NotesRequestBody,
  UpdateNotes,
} from "../lib/notes.types.ts";

export const notesService = {
  async list(Querystring: ListNotesQuery) {
    const { tag, search } = Querystring;
    const where: WhereOptions = {
      is_active: true,
    };
    if (tag) {
      where[Op.and as any] = [
        literal(`JSON_CONTAINS(tags, '${JSON.stringify([tag])}')`),
      ];
    }

    if (search) {
      where[Op.or as any] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    return await Notes.findAll({
      where,
      replacements: tag ? { tagValue: JSON.stringify([tag]) } : undefined,
    });
  },

  async create(body: NotesRequestBody) {
    return sequelize.transaction(async (t) => {
      return Notes.create(body);
    });
  },

  async updateNotes(body: UpdateNotes) {
    const { id, ...changedNote } = body;
    return Notes.update(changedNote, { where: { id } });
  },

  async deleteNote(id: number) {
    return Notes.update({ is_active: false }, { where: { id } });
  },

  async getNote(id: string) {
    return Notes.findByPk(id);
  },
};
