import { useState, useEffect } from "react";
import axios from "axios";
import TimeButtons from "./TimeButtons";
import PieGraph from "./PieGraph";

import { Box, Typography } from "@mui/material";

function TransactionDistribution(){
    const [transactions, setTransactions] = useState([]); 
    const [daysFilter, setDaysFilter] = useState(99999); 

    const updateDaysFilter = (days) => {
        setDaysFilter(days); 
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await axios.get("http://localhost:8000/userInfo", { withCredentials: true });
            const  accounts = await axios.get("http://localhost:8000/user/getAccounts",{
                params: {username: user.data.username},
            });

            let accountPrimaryKeys = []; 

            accounts.data.forEach((account) => {
                accountPrimaryKeys.push(account._id);
            })

            let newTransactions = [] 
            for(let i = 0; i < accountPrimaryKeys.length; i++){
                let key = accountPrimaryKeys[i]; 
                let matchingTransactions = await axios.get("http://localhost:8000/purchases/getPurchasesByAccountId", 
                    {params: {accountId: key}})
                matchingTransactions = matchingTransactions.data; 
               
                for(let j = 0; j < matchingTransactions.length; j++){
                    newTransactions.push(matchingTransactions[j])
                }
            }

            setTransactions(newTransactions);            
        };
    
        fetchData(); 
    }, []);

    function getDaysDifference(dateStr1) {
        const date1 = new Date(dateStr1);
        const today = new Date();
        const timeDiff = Math.abs(today - date1); // Difference in milliseconds
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
    }
    
    let pieGraphTransactions = [];
    for(let i = 0; i < transactions.length; i++){
        let transaction = transactions[i]; 
        if(getDaysDifference(transaction.date) <= daysFilter){
            pieGraphTransactions.push(transaction);
        }
    }

    return (
        <div style={{ height: "100%" }}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={4} mt={0}>
                {/* Transaction Title with Styling */}
                <div id="balances-header">
                    <div id="balances-header-1">
                        <Typography variant="h4" sx={styles.title}>
                            Transactions(Category)
                        </Typography>
                    </div>
                    <div id="balances-header-2">
                        {/* Additional elements, if needed, can go here */}
                    </div>
                </div>

                {/* Pie Graph and Filter */}
                <div style={{marginTop: "10px"}}>
                <PieGraph transactions={pieGraphTransactions} />
                <TimeButtons daysFilter={daysFilter} updateDaysFilter={updateDaysFilter} />
                </div>
            </Box>
        </div>
    );
}

const styles = {
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#333',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '20px',
    }
};

export default TransactionDistribution; 
