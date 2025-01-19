export interface Note {
  id: number;
  title: string;
  email: string;
  gptResponse: string;
  messageAt: number;
  summary: string;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
}

export interface ConversationCardProps {
  note: Note;
}

export interface LocationState {
  note: Note;
}
