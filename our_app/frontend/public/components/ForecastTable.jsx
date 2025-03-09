import React, {useState, useEffect} from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography,
    Card, CardContent, Box, Button} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Graph from "./Graph";

const ForecastTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [forecastTriggered, setForecastTriggered] = useState(false);

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
            console.log("response forecast for ", category, " is ",response);
            forecasts.push({category, forecast: response.data.forecast});
        }

        setForecastData(forecasts);
    }

    /*
    useEffect(()=>{
        if(transactions.length>0){
            getForecastForCategories();
        }
    }, [transactions])
    */

    const handleForecastClick = () => {
        if (transactions.length > 0) {
            getForecastForCategories();
            setForecastTriggered(true);
        }
    }

    return (
        <Box>
            <Card>
                <CardContent>
                    <Button variant="contained" color="primary" onClick = {handleForecastClick}>
                        Forecast Future Balances
                    </Button>
                    {forecastTriggered && forecastData.map((data,index) => (
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
