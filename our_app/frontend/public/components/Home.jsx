import '../../src/App.css';
import BankAccountsList from './BankAccountsList';
import Balances from './Balances';
import Navbar from './Navbar';
import TransactionDistribution from './TransactionDistribution';
import ForecastTable from './ForecastTable';
import { Box, Grid } from "@mui/material";

function Home() {
    return (
        <div id="container">
            <Navbar />
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start" gap={4} sx={{ mt: 8, ml:4 }}>
                {/* Left Section: First Row with Balances and Transaction Distribution, Second Row with ForecastTable */}
                <Box flex={1} minWidth="60%" maxWidth="60%" gap={4}>
                    <Grid container spacing={4}>
                        {/* First row with Balances and Transaction Distribution */}
                        <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
                            <Balances />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
                            <TransactionDistribution />
                        </Grid>

                        {/* Second row with ForecastTable taking up remaining width */}
                        <Grid item xs={12} sx={{ mt: 4 }}>
                            <ForecastTable />
                        </Grid>
                    </Grid>
                </Box>

                {/* Right Section: Bank Accounts List */}
                <Box flex={1} minWidth="40%" maxWidth="40%" mb={0} sx={{ ml:0, mt: 0 }}>
                    <BankAccountsList />
                </Box>
            </Box>
        </div>
    );
}

export default Home;
