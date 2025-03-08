import React, {useState, useEffect} from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography,
    Card, CardContent, Box} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const BankAccountsList = () => {
    const [accounts,setAccounts] = useState([]);
    const [transactions, setTransactions] = useState({});
    const [username, setUsername] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:8000/userInfo", {withCredentials:true})
            .then(response => {
                setUsername(response.data.username);
                fetchAccounts(response.data.username);
            })
            .catch(()=>console.log("User not logged in"));
    },[]);

    const fetchAccounts = async (username) => {
        try{
            const res = await axios.get("http://localhost:8000/user/getAccounts",{
                params: {username: username},
            });
            setAccounts(res.data);

        } catch (err) {
            console.error("Error fetching accounts", err);
        }
    };

    

    const fetchTransactions = async (accountId) => {
        try {
            const depositsRes = await axios.get("http://localhost:8000/deposit/getDepositsByAccountId", {
                params: { accountId: accountId },
            });
    
            const purchasesRes = await axios.get("http://localhost:8000/purchases/getPurchasesByAccountId", {
                params: { accountId: accountId },
            });
    
            // Combine deposits and purchases, then sort by date
            const combinedTransactions = [
                ...depositsRes.data,
                ...purchasesRes.data
            ].sort((a, b) => new Date(b.date) - new Date(a.date));
            // Update state with combined and sorted transactions
            setTransactions((prev) => ({
                ...prev,
                [accountId]: combinedTransactions,
            }));
    
        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    };


    return (
        <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }}>
            {accounts.map((account, index) => {
                const accountIdStr = account.accountId.toString(); 
                const maskedAccountId = `**** **** **** ${accountIdStr.slice(-4)}`;
                //console.log("account._id is ", account._id);
    
                return (
                    <Accordion key={account.accountId} onChange={() => fetchTransactions(account._id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Card sx={{ width: "100%", backgroundColor: `hsl(${index * 60},70%,80%)` }}>
                                <CardContent>
                                    <Typography variant="h6">{account.name} Account</Typography>
                                    <Typography variant="body2">Balance: ${account.balance}</Typography>
                                    <Typography variant="body2">Account ID: {maskedAccountId}</Typography>
                                </CardContent>
                            </Card>
                        </AccordionSummary>
    
                        <AccordionDetails sx={{ maxHeight: 200, overflowY: "auto" }}>
                            {transactions[account._id] ? (
                                transactions[account._id].map((txn, i) => (
                                    <Typography key={i} variant="body2">
                                        {txn.type}: ${txn.amount} - {new Date(txn.date).toLocaleDateString()}
                                    </Typography>
                                ))
                            ) : (
                                <Typography>Loading transactions...</Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
};


export default BankAccountsList;


