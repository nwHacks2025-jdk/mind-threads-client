import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function MenuBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#59da90' }}>
        <Toolbar>
          <img
            src="logo.svg"
            alt="logo"
            height={40}
            style={{ cursor: 'pointer' }}
            onClick={() => (window.location.href = 'home')}
          />
          {!isMobile && (
            <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
              <Button
                color="inherit"
                sx={{ color: 'black' }}
                onClick={() => (window.location.href = 'study')}
              >
                <BookIcon sx={{ mr: 1 }} />
                Notes
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
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <BottomNavigation
          sx={{
            position: 'fixed',
            zIndex: 10,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#59da90',
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => (window.location.href = 'home')}
          />
          <BottomNavigationAction
            label="Study"
            icon={<SchoolIcon />}
            onClick={() => (window.location.href = 'study')}
          />
          <BottomNavigationAction
            label="User"
            icon={<PersonIcon />}
            onClick={() => (window.location.href = 'user')}
          />
        </BottomNavigation>
      )}
    </>
  );
}
