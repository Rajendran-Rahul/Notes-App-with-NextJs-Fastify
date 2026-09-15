export interface ListNotesQuery {
  tag?: string;
  search?: string;
}

export interface NotesRequestBody {
  title: string;
  description: string;
  is_active: true | false;
  tags?: string[];
}

export interface UpdateNotes extends Partial<NotesRequestBody> {
  id: number;
}

export interface NoteIdParam {
  id: string; // required, always present when this route matches
}
