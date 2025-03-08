import { useState, useEffect } from "react";
import axios from "axios";
import '../../src/App.css' 
import BalanceTable from "./BalanceTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Balances(){
    const [accounts, setAccounts] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/userInfo", {withCredentials:true})
            .then(response => {
                fetchAccounts(response.data.username);
            })
            .catch(()=>console.log("User not logged in"));
    },[]);

    const fetchAccounts = async (username) => {
        try{
            const res = await axios.get("http://localhost:8000/user/getAccounts",{
                params: {username: username},
            });
            console.log("res data is ", res.data, "type of res.data is ", typeof res.data);
            setAccounts(res.data);

        } catch (err) {
            console.error("Error fetching accounts", err);
        }
    };

    let bankAccounts = accounts.filter((account) => account.type === "Debit");  
    let totalBalance = 0; 

    bankAccounts.forEach((account) => {
        totalBalance+=account.balance; 
    })


    return <div id = "balances-container">
        <div id="balances-header">
            <div>Bank Balance</div>
            <div>
                <button id = "addAccount-btn">
                    Add <AddCircleIcon/> 
                </button>
            </div>
        </div>
        <div>
            TABLE
        </div>
        <div>
            Total Balance: ${totalBalance.toFixed(2)}
        </div>
    </div>;
}


export default Balances; 