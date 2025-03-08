import { useState, useEffect } from "react";
import axios from "axios";
import TimeButtons from "./TimeButtons";
import PieGraph from "./PieGraph";

function TransactionDistribution(){
    const [transactions, setTransactions] = useState([]); 
    const [daysFilter, setDaysFilter] = useState(99999); 
    console.log("daysFilter", daysFilter);

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
                console.log("key: ", key, matchingTransactions);
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
        console.log(getDaysDifference(transaction.date))
        if(getDaysDifference(transaction.date) <= daysFilter){
            pieGraphTransactions.push(transaction);
        }
    }

    return <div>
        <h1>Transactions</h1>
        <PieGraph transactions={pieGraphTransactions}/> 
        <TimeButtons daysFilter={daysFilter} updateDaysFilter={updateDaysFilter}/>
    </div>;
}

export default TransactionDistribution; 

