import { useState, useEffect } from "react";
import axios from "axios";
import TimeButtons from "./TimeButtons";

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


    return <div>
        <TimeButtons updateDaysFilter={updateDaysFilter}/>
    </div>;
}

export default TransactionDistribution; 

