type TagProps = {
  text?: string;
  large?: boolean;
  medium?: boolean;
};

export default function Tag({ text, large, medium }: TagProps) {
  return (
    <button
      disabled
      style={{
        borderRadius: '40px',
        padding: large ? '4px 20px' : medium ? '5px 15px' : '6px 10px',
        color: large ? 'green' : medium ? 'blue' : 'red',
        backgroundColor: 'transparent',
        border: large
          ? '1px solid green'
          : medium
            ? '1px solid blue'
            : '1px solid red',
        cursor: 'default',
        pointerEvents: 'none',
        fontSize: large ? '20px' : medium ? '16px' : '8px',
        margin: 'auto',
      }}
    >
      {text}
    </button>
  );
}
