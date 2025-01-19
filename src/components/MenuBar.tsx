import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { VscAccount } from 'react-icons/vsc';
import { VscHome } from 'react-icons/vsc';
import { VscLibrary } from 'react-icons/vsc';

export default function MenuBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#59da90' }}>
        <Toolbar>
          <img
            src="/logo.svg"
            alt="logo"
            height={55}
            style={{ cursor: 'pointer' }}
            onClick={() => (window.location.href = '/home')}
          />
          {!isMobile && (
            <Box
              sx={{
                marginLeft: 'auto',
                marginRight: '10px',
                display: 'flex',
                gap: 1,
              }}
            >
              <Button
                sx={{
                  color: '#101010',
                  borderRadius: 10,
                  gap: 1,
                }}
                onClick={() => (window.location.href = '/home')}
              >
                <VscHome size={25} />
                Home
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: '#101010',
                  borderRadius: 10,
                  gap: 1,
                }}
                onClick={() => (window.location.href = '/threads')}
              >
                <VscLibrary size={25} />
                Threads
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: '#101010',
                  borderRadius: 10,
                  gap: 1,
                }}
                onClick={() => (window.location.href = '/user')}
              >
                <VscAccount size={25} />
                Profile
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#59da90',
            paddingBottom: '60px',
            zIndex: 10,
          }}
          elevation={3}
        >
          <BottomNavigation
            sx={{
              position: 'fixed',
              zIndex: 10,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<VscHome size={26} />}
              onClick={() => (window.location.href = '/home')}
            />
            <BottomNavigationAction
              label="Study"
              icon={<VscLibrary size={26} />}
              onClick={() => (window.location.href = '/threads')}
            />
            <BottomNavigationAction
              label="User"
              icon={<VscAccount size={26} />}
              onClick={() => (window.location.href = '/user')}
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
}
