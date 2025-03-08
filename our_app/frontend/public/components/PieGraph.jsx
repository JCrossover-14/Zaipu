import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function PieGraph({transactions}){
    const dictionary = {}; 

    for(let i = 0; i < transactions.length; i++){
        let transaction = transactions[i]; 
        let category = transaction.category; 
        let amount = transaction.amount; 

        if(category in dictionary){
            dictionary[category]+=amount; 
        }else{
            dictionary[category]=amount; 
        }
    }

    let pieGraphData = []; 
    let curId = 0;

    for (let key in dictionary){
        if(Object.prototype.hasOwnProperty.call(dictionary, key)){
            pieGraphData.push({
                id: curId,
                label: key, 
                value: dictionary[key], 
            })
            curId+=1
        }

    }

    console.log("Pie Graph Data: ", pieGraphData);


    return (
        <div id = "pieChart-div">
            <PieChart
            series={[
            {
                data: pieGraphData
            },
            ]}
            width={400} 
            height={200}/>
        </div>
  );
}

export default PieGraph; 
