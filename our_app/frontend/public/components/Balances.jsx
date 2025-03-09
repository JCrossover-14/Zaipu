import { useState, useEffect } from "react";
import axios from "axios";
import '../../src/App.css' 
import BalanceTable from "./BalanceTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddAccountBtn from "./AddAccountBtn";
import { Typography } from "@mui/material";

function Balances(){
    const [accounts, setAccounts] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:8000/userInfo", {withCredentials:true})
            .then(response => {
                fetchAccounts(response.data.username);
            })
            .catch(()=>console.log("User not logged in"));
    },[refreshKey]);
    
    const refresh = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    }
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

    let bankAccounts = accounts
    /*.filter((account) => account.type === "Debit"); */
    let totalBalance = 0; 

    bankAccounts.forEach((account) => {
        totalBalance+=account.balance; 
    })

    

    return <div id = "balances-container">
        <div id="balances-header">
            <div id = "balances-header-1">
                <h1>
                    Bank Balances
                </h1>
            </div>
            <div id = "balances-header-2">
                {/* <button id = "addAccount-btn">
                    Add New Bank   <AddCircleIcon/> 
                </button> */}
                <AddAccountBtn refresh={refresh}/>
            </div>
        </div>
        <div style={{marginTop: "5px"}}>
            <BalanceTable bankAccounts={bankAccounts}/>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Typography 
                    variant="h4" 
                    sx={{
                        fontWeight: "bold",
                        fontSize: "2rem",  
                        margin: "0px 0",  
                        padding: "10px",
                        backgroundColor: "#f0f0f0",  // Light background to highlight
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"  // Subtle shadow for emphasis
                    }}
                >
                    Total Balance: ${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
            </div>
    </div>;
}


export default Balances; 