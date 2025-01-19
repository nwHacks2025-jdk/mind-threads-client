type WelcomeHeaderProps = {
  title: string;
};

export default function WelcomeHeader({ title }: WelcomeHeaderProps) {
  return (
    <div style={{ color: 'black', fontSize: '2rem', fontWeight: '500' }}>
      {title}
    </div>
  );
}
