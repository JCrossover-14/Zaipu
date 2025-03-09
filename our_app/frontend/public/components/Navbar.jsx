import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Logo from '../../assets/logo.png';
function Navbar(){
    return (<div id="navbar" style = {styles.navbarContainer}>
        <div style = {styles.logoContainer}>
            <img src ={Logo} alt = "Logo" style={styles.logo}/>
            <Typography variant = "h4" style = {styles.title}> Zaipu </Typography>

        </div>
        <div>
            <Button id = "logout-btn" variant="outlined">Logout</Button>
        </div>
    </div>);
}

const styles = {
    navbarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
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
        color: '#333',  // Black color with a slight gray tint
        letterSpacing: '1px',
        textTransform: 'uppercase',
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
