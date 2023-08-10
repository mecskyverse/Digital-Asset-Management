import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/Picture1.png'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    const anchor = 'left';
    const [sidebarOpen, setSideBarOpen] = useState(false)
    console.log(sidebarOpen)
    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setSideBarOpen(!sidebarOpen);
    };
    const list = () => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <List>
                {['Home', 'Transform', 'Image Tagging', 'Focal Point', 'Effects', 'Tagging', 'Optimizations'].map((text, index) => (
                    <>
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}

            </List>

        </Box>
    );

    if (sidebarOpen) {
        return (
            <div>
                <nav className='w-full shadow-lg flex justify-center'>
                    <span className='flex items-center'>
                        <img src={logo} className='h-7 self-center' alt="Example" />
                        <span className='self-center logo'>Imager</span>
                    </span>
                </nav >
                <React.Fragment key={'left'}>
                    <Drawer
                        anchor={'left'}
                        open={true}
                        onClose={toggleDrawer()}
                    >
                        {list('left')}
                    </Drawer>
                </React.Fragment>
            </div>
        )
    }



    return (
        <nav className='w-full shadow-lg flex justify-center'>
            <button className='md:hidden absolute left-7 top-4' onClick={toggleDrawer()}><MenuIcon fontSize="medium" color="secondary" /></button>
            <span className='flex items-center'>
                <img src={logo} className='h-7 self-center' alt="Example" />
                <span className='self-center logo'>Imager</span>
            </span>
            <ul className='md:flex sm:flex-row flex-col items-center justify-center hidden' >
                <li className='mx-2 p-4 hover:scale-110 transition-transform'><Link to='/' >Home</Link></li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'><Link to='/transform' >Transform</Link></li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'>Focal Point</li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'>Effects</li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'><Link to='/Tagging' >Tagging</Link></li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'>Optimizations</li>
            </ul>
        </nav >
    )
}

export default Navbar