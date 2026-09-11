export interface ListNotesQuery {
  tag?: string;
  search?: string;
}

export interface NotesRequestBody {
  title: string;
  description: string;
  is_active: true | false;
  tag?: string;
}

export interface UpdateNotes extends Partial<NotesRequestBody> {
  id: number;
}
