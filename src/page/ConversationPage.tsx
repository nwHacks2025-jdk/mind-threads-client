import Container from '../components/Container';
import MenuBar from '../components/MenuBar';
import Tag from '../components/Tag';

export default function ConversationPage() {
  return (
    <>
      <MenuBar />
      <div>
        <Container title="Title" />

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            paddingTop: 15,
          }}
        >
          <Tag text="Tag#1" large />
          <Tag text="Tag#2" large />
          <Tag text="Tag#3" large />
          <Tag text="Tag#4" large />
        </div>

        <div style={{ padding: 10 }} />

        <Container
          title="Summary"
          body="Lorem epsum dolor sit amet"
          height={200}
        />
        <div style={{ padding: 10 }} />

        <Container
          title="Real Conversation"
          body="Lorem epsum dolor sit amet"
          height={600}
        />
      </div>
    </>
  );
}
