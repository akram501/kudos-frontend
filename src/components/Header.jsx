import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useKudos } from "../context/KudosContext";

const Header = () => {
    const { remaining, loading } = useKudos();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // this will move count to right
            padding: '10px 20px',
            background: '#1976d2',
            color: 'white'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => setDrawerOpen(true)} style={{ color: 'white' }}>
                    <MenuIcon />
                </IconButton>
                <h2 style={{ marginLeft: '10px' }}>Kudos App</h2>
            </div>

            <div style={{
                background: "#3949ab",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "bold"
            }}>
                {loading ? "Loading kudos..." : `Kudos left this week: ${remaining}`}
            </div>

            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List style={{ width: 250 }}>
                    <ListItem button onClick={() => { navigate('/give-kudos'); setDrawerOpen(false); }}>
                        <ListItemText primary="Give Kudos" />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/my-kudos'); setDrawerOpen(false); }}>
                        <ListItemText primary="My Kudos" />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/users'); setDrawerOpen(false); }}>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
};

export default Header;
