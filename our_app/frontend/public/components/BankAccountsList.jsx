import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, Box, IconButton, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BankAccountsList = () => {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState({});
    const [username, setUsername] = useState(null);
    const [expandedAccount, setExpandedAccount] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/userInfo", { withCredentials: true })
            .then(response => {
                setUsername(response.data.username);
                fetchAccounts(response.data.username);
            })
            .catch(() => console.log("User not logged in"));
    }, []);

    const fetchAccounts = async (username) => {
        try {
            const res = await axios.get("http://localhost:8000/user/getAccounts", {
                params: { username: username },
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

            const combinedTransactions = [...depositsRes.data, ...purchasesRes.data].sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions((prev) => ({ ...prev, [accountId]: combinedTransactions }));
        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    };

    return (
        <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
            {/* Title Section */}
            {!expandedAccount && (
                <Box sx={{ width: "100%", marginBottom: 4 }}>
                    <div id="balances-header">
                        <div id="balances-header-1">
                            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                                Transactions (By Account)
                            </Typography>
                        </div>
                    </div>
                </Box>
            )}

            {expandedAccount ? (
                <Box sx={{ width: "100%", height: "auto", overflowY: "auto", p: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <IconButton onClick={() => setExpandedAccount(null)}>
                            <ArrowBackIcon />
                        </IconButton>
                        {/* Centering the title */}
                        <Typography variant="h5" sx={{ flex: 1, textAlign: "center", fontWeight: "bold", color: "#3f51b5" }}>
                            Transactions
                        </Typography>
                    </Box>
                    <Card sx={{
                        width: "80%",
                        backgroundColor: "hsl(220,10%,30%)",
                        color: "#fff",
                        borderRadius: "16px",
                        padding: "24px",
                        mb: 2,
                        mx: "auto",
                        minHeight: "200px"
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "22px", textTransform: "uppercase", opacity: 0.9, textAlign: "left" }}>
                            {accounts.find(acc => acc._id === expandedAccount)?.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, opacity: 0.8, textAlign: "left" }}>
                            Balance: ${accounts.find(acc => acc._id === expandedAccount)?.balance}
                        </Typography>
                    </Card>
                    <Box sx={{
                        maxHeight: "125vh", // Set max height to 125% of the viewport height
                        overflowY: "auto", // Enable vertical scrolling when the content exceeds the max height
                    }}>
                        {transactions[expandedAccount] ? (
                            transactions[expandedAccount].map((txn, i) => (
                                <Card
                                    key={txn._id || i} // Use txn._id if possible, else fallback to index
                                    sx={{
                                        backgroundColor: txn.type === "deposit" ? "hsl(140, 50%, 50%)" : "hsl(40, 80%, 50%)",
                                        color: "#fff",
                                        borderRadius: "16px",
                                        padding: "16px",
                                        mb: 2,
                                        fontFamily: 'Poppins, sans-serif',
                                        width: "100%",
                                    }}
                                >
                                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "18px" }}>
                                            {txn.category} Transaction
                                        </Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                            Amount: ${txn.amount}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                            Date: {new Date(txn.date).toLocaleDateString()}
                                        </Typography>
                                        {txn._id && (
                                            <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                                Transaction ID: {txn._id}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography>Loading transactions...</Typography>
                        )}
                    </Box>
                </Box>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {accounts.map((account, index) => {
                        const accountIdStr = account.accountId.toString();
                        const maskedAccountId = `**** **** **** ${accountIdStr.slice(-4)}`;

                        return (
                            <Grid item xs={12} sm={6} key={account.accountId}>
                                <Accordion onChange={() => fetchTransactions(account._id)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setExpandedAccount(account._id)}>
                                        <Card sx={{
                                            width: "100%",
                                            height: expandedAccount === account._id ? "auto" : "160px",
                                            backgroundColor: `hsl(${index * 60},10%,30%)`,
                                            color: "#fff",
                                            borderRadius: "16px",
                                            padding: "24px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            minHeight: "160px",
                                            position: "relative",
                                            fontFamily: 'Poppins, sans-serif',
                                            transition: "width 0.5s ease, height 0.5s ease",
                                        }}>
                                            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1, textAlign: "left" }}>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "20px", textTransform: "uppercase", opacity: 0.9 }}>
                                                    {account.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: "14px", opacity: 0.7 }}>
                                                    Account ID: {maskedAccountId}
                                                </Typography>
                                            </CardContent>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: "16px",
                                                    right: "24px",
                                                    fontWeight: "600",
                                                    fontFamily: 'Poppins, sans-serif'
                                                }}
                                            >
                                                ${account.balance}
                                            </Typography>
                                        </Card>
                                    </AccordionSummary>
                                </Accordion>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default BankAccountsList;
