import React, {useState, useEffect} from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography,
    Card, CardContent, Box} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Graph from "./Graph";

const ForecastTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            console.log("trying to fetch from userInfo");
            const user = await axios.get("http://localhost:8000/userInfo", {withCredentials:true});
            console.log("user is ", user);
            const accounts = await axios.get("http://localhost:8000/user/getAccounts",{
                params: {username: user.data.username},
            });
        let accountPrimaryKeys = []
        accounts.data.forEach((account)=>{
            accountPrimaryKeys.push(account._id);
        });

        let newTransactions = [];
        for (let i = 0;i<accountPrimaryKeys.length;i++){
            let key = accountPrimaryKeys[i];
            let matchingTransactions = await axios.get("http://localhost:8000/purchases/getPurchasesByAccountId",
                {params: {accountId:key}});
            matchingTransactions = matchingTransactions.data;

            for (let j=0;j<matchingTransactions.length;j++){
                newTransactions.push(matchingTransactions[j]);
            }
        }
        setTransactions(newTransactions);
        console.log("transactions are now ",transactions);
    };
    
     fetchData();
    },[]);

    const categorizeTransactions = () => {
        const categories = {};
        transactions.forEach((transaction) => {
            const {type, accountId, amount, date,category} = transaction;
            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push({date, amount});
        })

        return categories;
    }

    const getForecastForCategories = async() => {
        const categories = categorizeTransactions();
        const forecasts = [];
        for (const category in categories){
            const response = await axios.post("http://localhost:5000/forecast", {
                transactions: categories[category]
            });
            forecasts.push({category, forecast: response.data.forecast});
        }

        setForecastData(forecasts);
    }

    useEffect(()=>{
        if(transactions.length>0){
            getForecastForCategories();
        }
    }, [transactions])

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant = "h6"> Forecasted Future Balance</Typography>
                    {forecastData.map((data,index) => (
                        <Accordion key = {index}>
                            <AccordionSummary
                                expandIcon = {<ExpandMoreIcon />}
                                aria-controls = {`panel-${data.category}-content`}
                                id = {`panel-${data.category}-header`}>
                                    <Typography>{data.category}</Typography>
                            </AccordionSummary>
    
                            <AccordionDetails>
                                <Graph
                                    data = {forecastData}
                                />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
}




export default ForecastTable;
