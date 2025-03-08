import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

function BalanceTable({bankAccounts}) {
    console.log("BalanceTables: ", bankAccounts);
    // return (
    //     // <Paper style={{ height: 400, width: '100%' }}>
    //     // <TableVirtuoso
    //     //     data={rows}
    //     //     components={VirtuosoTableComponents}
    //     //     fixedHeaderContent={fixedHeaderContent}
    //     //     itemContent={rowContent}
    //     // />
    //     // </Paper>
    // );
}

export default BalanceTable; 