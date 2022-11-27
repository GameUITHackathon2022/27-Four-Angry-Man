import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import icon from '../assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import '../styles/navbav.css'
import { useEffect } from 'react';



const pages = ['Trang chủ', 'Báo cáo'];
const settings = ['Profile', 'Sign out'];

function ResponsiveAppBar(user) {

    const [login, SetLogin] = React.useState(false);

    const theme = createTheme({
            palette: {
            mode: 'light',
            },
        });

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleLogin = () => {
        SetLogin(user !== undefined);
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleClickOnUserMenu = (event) => {
        
        switch(settings.indexOf(event.target.innerText))
        {
            case 1:
                SetLogin(false);
                break;
            case 0:
                break;
            default:
                break;
        }
        handleCloseUserMenu();
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    console.log(`nav ${JSON.stringify(user)}`)

    const reset = () =>
    {
        window.location.href='http://localhost:3000/'
    }

    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static">
        <Container maxWidth="xl" color="primary light" >
            <Toolbar id="back-to-top-anchor" disableGutters>
            
            <Avatar
                alt="Remy Sharp"
                src={icon}
                sx={{ width: 34, height: 34, display: { xs: 'none', md: 'flex' }, mr: 1 }}
                variant="square"
            />
          <Typography component={Link} to='/home'
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
            AVEIT
          </Typography>
          <Divider orientation="vertical" variant="middle" sx={{display:{xs:'none', md: 'flex'}}} flexItem/>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                    <MenuItem component={Link} to='/' key={pages[0]} onClick={handleCloseNavMenu}>
                        <HomeIcon sx={{ mr: 1 , fontSize:'medium'}} />
                        <Typography textAlign="center">{pages[0]}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to='role2' key={pages[1]} onClick={handleCloseNavMenu}>
                        <AnalyticsIcon sx={{ mr: 1 , fontSize:'medium'}} />
                        <Typography textAlign="center">{pages[1]}</Typography>
                    </MenuItem>

                </Menu>
            </Box>
            <Avatar
                alt="Remy Sharp"
                src={icon}
                sx={{ width: 34, height: 34, display: { xs: 'flex', md: 'none' }, mr: 1 }}
                variant="square" onClick={reset}
            />
            <Typography
                variant="h5"
                noWrap
                component={Link} to='/home'
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                
                }}
                
            >
                AVEIT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button 
                    className='underline-button'
                    component={Link} to='/'
                    key={pages[0]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                >
                    <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize:'medium'}} />
                    {pages[0]}
                </Button>
                <Button 
                    className='underline-button'
                    key={pages[1]}
                    component={Link} to='role2'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                >
                    <LibraryBooksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize:'medium' }} />
                    {pages[1]}
                </Button>
                
            </Box>


            {login ? (<><Button color='secondary' variant='contained' sx={{ my: 2, display: 'flex' , mr:1}}>Create</Button>
            <Box sx={{ flexGrow: 0 }}>
                
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                
                    <MenuItem component={Link} to='profile' key={settings[0]} onClick={handleClickOnUserMenu}>
                        <AccountCircleIcon color='success' sx={{ mr: 1 }}/>            
                        <Typography textAlign="center" >{settings[0]}</Typography>
        
                    </MenuItem>
                    <Divider/>
                    <MenuItem key={settings[1]} onClick={handleClickOnUserMenu}>
                        <LogoutIcon sx={{mr: 1 , color: red[500]}} /> 
                        <Typography textAlign="center" >{settings[1]}</Typography>
                    </MenuItem>
                
                </Menu>
            </Box></>)
            : <Box sx={{ flexGrow: 0 }}>
                <Button component={Link} to='signup' variant="contained" sx={{m: 1, backgroundColor: '#1a4b6d'}}>Tham gia</Button>
            </Box>}
            </Toolbar>
        </Container>
        </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;
