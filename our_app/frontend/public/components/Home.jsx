import '../../src/App.css';
import BankAccountsList from './BankAccountsList';
import Balances from './Balances';
import Navbar from './Navbar';
import TransactionDistribution from './TransactionDistribution';
import ForecastTable from './ForecastTable';
import { Box, } from "@mui/material";

function Home(){
    return (
    <div id = "container">
        <Navbar/>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start" gap = {4}>
            <Box flex={1}  minWidth="30%" maxWidth="30%" gap = {4} p = {2}>
                <Balances/>
                <ForecastTable/>
            </Box>
            
            <TransactionDistribution gap = {4} />
                
            <Box flex={1} minWidth="40%" maxWidth="40%" mb = {4}>
                <BankAccountsList/>
            </Box>
        </Box>
        
    </div>);
    
        
}

export default Home; 