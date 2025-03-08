import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BalanceTable = ({ bankAccounts }) => {
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "50%" }}><b>Name</b></TableCell>
            <TableCell align="left" sx={{ width: "50%" }}><b>Balance</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankAccounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: "50%" }}>{account.name}</TableCell>
              <TableCell align="left" sx={{ width: "50%" }}>${account.balance.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BalanceTable;
