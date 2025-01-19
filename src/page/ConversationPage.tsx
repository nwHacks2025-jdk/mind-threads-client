import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from '../components/Container';
import MenuBar from '../components/MenuBar';
import Tag from '../components/Tag';
import { LocationState } from '../types/Notes';

export default function ConversationPage() {
  const { tag } = useParams<{ tag: string }>();
  const location = useLocation();
  const state = location.state as LocationState;

  const note = state?.note;

  useEffect(() => {
    if (tag) {
      console.log(tag);
    }
    if (note) {
      console.log('Received Note:', note);
    } else {
      console.warn('No note data received');
    }
  }, [tag, note]);

  if (!note) {
    return (
      <>
        <MenuBar />
        <div style={{ padding: 20 }}>
          <h2>No conversation data available.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <MenuBar />
      <div>
        <Container title={note.title} />

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            paddingTop: 15,
          }}
        >
          {note.tag1 && <Tag text={note.tag1} large />}
          {note.tag2 && <Tag text={note.tag2} large />}
          {note.tag3 && <Tag text={note.tag3} large />}
          {note.tag4 && <Tag text={note.tag4} large />}
          {note.tag5 && <Tag text={note.tag5} large />}
        </div>

        <div style={{ padding: 10 }} />

        <Container title="Summary" body={note.summary} height={200} />
        <div style={{ padding: 10 }} />

        <Container
          title="Real Conversation"
          body={note.gptResponse}
          height={600}
        />
      </div>
    </>
  );
}
