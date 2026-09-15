export interface ListNotesQuery {
  tag?: string;
  search?: string;
}

export interface NoteProps {
  title: string;
  description: string;
  is_active?: true | false;
  updatedAt: string
  tags?: string[];
  id?: number,
}

export interface UpdateNotes extends Partial<NoteProps> {
  id: number;
}

export interface ApiResponse {
  message: string;
  data?: Partial<NoteProps>;
}
