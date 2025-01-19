type TagProps = {
  text?: string;
  large?: boolean;
  medium?: boolean;
};

export default function TitleTag({ text, large, medium }: TagProps) {
  return (
    <button
      disabled
      style={{
        color: '#1B5074',
        backgroundColor: 'transparent',
        cursor: 'default',
        pointerEvents: 'none',
        fontSize: '20px',
      }}
    >
      {text}
    </button>
  );
}
