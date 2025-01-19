import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type TagProps = {
  text?: string;
  large?: boolean;
  medium?: boolean;
};

export default function TitleTag({ text, large, medium }: TagProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <button
      disabled
      style={{
        color: '#000000',
        backgroundColor: 'transparent',
        cursor: 'default',
        pointerEvents: 'none',
        fontSize: isMobile ? '16px' : '20px',
      }}
    >
      {text}
    </button>
  );
}
