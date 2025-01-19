type TagProps = {
  text?: string;
  large?: boolean;
};

export default function Tag({ text, large }: TagProps) {
  return (
    <button
      disabled
      style={{
        borderRadius: '40px',
        padding: '6px 10px',
        color: 'red',
        backgroundColor: 'transparent',
        border: '1px solid red',
        cursor: 'default',
        pointerEvents: 'none',
        fontSize: large ? '16px' : '8px',
        margin: 'auto',
      }}
    >
      {text}
    </button>
  );
}
