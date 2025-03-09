import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography,
    Card, CardContent, Box, Button, Grid } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Graph from "./Graph";
import Graph2 from "./Graph2";

const ForecastTable = ({ totalInitialBalance }) => {
    const [transactions, setTransactions] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [forecastTriggered, setForecastTriggered] = useState(false);
    const [balanceData, setBalanceData] = useState([]);
    const [initialBalance, setInitialBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            console.log("trying to fetch from userInfo");
            const user = await axios.get("http://localhost:8000/userInfo", { withCredentials: true });
            console.log("user is ", user);
            const accounts = await axios.get("http://localhost:8000/user/getAccounts", {
                params: { username: user.data.username },
            });
            let accountPrimaryKeys = [];
            let totalBalance = 0;
            accounts.data.forEach((account) => {
                accountPrimaryKeys.push(account._id);
                totalBalance += account.balance;
            });

            setInitialBalance(totalBalance);

            let newTransactions = [];
            let newDeposits = [];
            for (let i = 0; i < accountPrimaryKeys.length; i++) {
                let key = accountPrimaryKeys[i];
                let matchingTransactions = await axios.get("http://localhost:8000/purchases/getPurchasesByAccountId",
                    { params: { accountId: key } });

                let matchingDeposits = await axios.get("http://localhost:8000/deposit/getDepositsByAccountId",
                    { params: { accountId: key } });

                matchingTransactions = matchingTransactions.data;
                matchingDeposits = matchingDeposits.data;
                for (let j = 0; j < matchingTransactions.length; j++) {
                    newTransactions.push(matchingTransactions[j]);
                }
                for (let j = 0; j < matchingDeposits.length; j++) {
                    newDeposits.push(matchingDeposits[j]);
                }
            }
            setTransactions(newTransactions);
            setDeposits(newDeposits);
            console.log("transactions are now ", newTransactions);
            console.log("deposits are now ", newDeposits);
        };

        fetchData();
    }, []);

    const categorizeTransactions = () => {
        const categories = {};
        transactions.forEach((transaction) => {
            const { type, accountId, amount, date, category } = transaction;
            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push({ date, amount });
        })

        return categories;
    }

    const getForecastForCategories = async () => {
        const categories = categorizeTransactions();
        const forecasts = [];
        for (const category in categories) {
            const response = await axios.post("http://localhost:5000/forecast", {
                transactions: categories[category]
            });
            console.log("response forecast for ", category, " is ", response);
            forecasts.push({ category, forecast: response.data.forecast });
        }

        setForecastData(forecasts);
    }

    const forecastBalanceOverTime = () => {
        console.log("initial balance is ", initialBalance);

        let sortedTransactions = transactions.map(({ date, amount }) => ({
            date: new Date(date),
            amount: -amount, // Transactions decrease balance
        }));

        let sortedDeposits = deposits.map(({ date, amount }) => ({
            date: new Date(date),
            amount, // Deposits increase balance
        }));

        let balanceChanges = [...sortedTransactions, ...sortedDeposits];
        balanceChanges.sort((a, b) => a.date - b.date);

        let i = 0, j = 0;
        let currentBalance = initialBalance;
        let balanceOverTime = [];

        while (i < transactions.length || j < deposits.length) {
            let transactionDate = i < transactions.length ? new Date(transactions[i].date) : null;
            let depositDate = j < deposits.length ? new Date(deposits[j].date) : null;

            if (transactionDate && (!depositDate || transactionDate < depositDate)) {
                currentBalance -= transactions[i].amount;
                balanceOverTime.push({
                    date: transactionDate.toISOString().split("T")[0],
                    balance: currentBalance,
                });
                i++;
            } else {
                currentBalance += deposits[j].amount;
                balanceOverTime.push({
                    date: depositDate.toISOString().split("T")[0],
                    balance: currentBalance,
                });
                j++;
            }
        }
        balanceOverTime.sort((a, b) => new Date(a.date) - new Date(b.date));
        setBalanceData(balanceOverTime);
    }

    const handleForecastClick = () => {
        if (transactions.length > 0) {
            getForecastForCategories();
            setForecastTriggered(true);
            forecastBalanceOverTime();
        }
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {/* Accordion Section */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Button variant="contained" color="primary" onClick={handleForecastClick}>
                                Forecast Future Balances
                            </Button>
                            {forecastTriggered && forecastData.map((data, index) => (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-${data.category}-content`}
                                        id={`panel-${data.category}-header`}>
                                        <Typography>{data.category}</Typography>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Graph data={forecastData} />
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Forecast Balance Graph Section */}
                <Grid item xs={12} sm={6}>
                    {forecastTriggered && <Graph2 data={balanceData} />}
                </Grid>
            </Grid>
        </Box>
    );
}

export default ForecastTable;
