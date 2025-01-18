import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

export default function MenuBar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#59da90' }}>
        <Toolbar>
          {/* clicking on logo leads to home */}
          <img
            src="logo.svg"
            alt="logo"
            height={40}
            style={{ cursor: 'pointer' }}
            onClick={() => (window.location.href = 'home')}
          />
          <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
            <Button
              color="inherit"
              sx={{ color: 'black' }}
              onClick={() => (window.location.href = 'study')}
            >
              <SchoolIcon sx={{ mr: 1 }} />
              Study
            </Button>
            <Button
              color="inherit"
              sx={{ color: 'black' }}
              onClick={() => (window.location.href = 'user')}
            >
              <PersonIcon sx={{ mr: 1 }} />
              User
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
