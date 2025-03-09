import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Logo from '../../assets/logo.png';
import axios from 'axios';

function Navbar(){
    const [username, setUsername] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/userInfo", { withCredentials: true })
            .then(response => {
                setUsername(response.data.username); // Assuming the backend sends the logged-in username
            })
            .catch(() => setUsername(null)); // If not logged in, username will be null
    }, []);

    return (
        <div id="navbar" style={styles.navbarContainer}>
            <div style={styles.logoContainer}>
                <img src={Logo} alt="Logo" style={styles.logo} />
                <Typography variant="h4" style={styles.title}> Zaipu </Typography>
            </div>
            <div style={styles.rightSection}>
                {username && (
                    <Typography variant="h6" style={styles.loggedInText}>
                        Welcome, {username}
                    </Typography>
                )}
                <Button id="logout-btn" variant="outlined">Logout</Button>
            </div>
        </div>
    );
}

const styles = {
    navbarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensures the navbar stays above the content
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        height: '50px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    loggedInText: {
        fontSize: '16px',
        color: '#333',
    },
    logoutButton: {
        borderRadius: '20px',
        padding: '8px 16px',
        color: '#333',
        borderColor: '#333',
        fontWeight: 'bold',
        textTransform: 'none',
    }
};

export default Navbar;
