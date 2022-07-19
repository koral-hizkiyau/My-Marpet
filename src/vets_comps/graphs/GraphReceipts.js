import React from 'react';
import CanvasjsReact from "../../js/graphs_js/canvasjs.react";

function GraphReceipts(props) {

    let prices = 0;
    let countR = 0;

    // eslint-disable-next-line array-callback-return
    props.customers.map(item => item.receipts.map(item => {

        prices += item.price;
        countR++;

    })
        

    )


                
 
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;



    var options = {
        animationEnabled: true,
        exportEnabled: true,
                title:{
            text: "Numbers Of Receipts + All Sales"   
        },
        toolTip: {
            shared: true,
            reversed: true
        },
        data: [{
            type: "stackedColumn",
            name: "Numbers Of Receipts",
            showInLegend: "true",
            yValueFormatString: "#,##0 Numbers Of Receipts",
            dataPoints: [
                { y: countR , label: "All Sales / Receipt Numbers" },

            ]
        },
        {
            type: "stackedColumn",
            name: "All Sales",
            showInLegend: "true",
            yValueFormatString: "#,##0₪ All Sales",
            dataPoints: [
                { y: prices , label: "All Sales / Receipt Numbers" },

            ]
        }]
    }    

    return (
        <CanvasJSChart options={options} />
    )
}

export default GraphReceipts;