import React from 'react';
import CanvasjsReact from "../../js/graphs_js/canvasjs.react";
import "../../css/graphs.css";

function GraphCustomer(props){
    let CanvasJS = CanvasjsReact.CanvasJS;
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;

let customersGraph = props.customers;
let petsGraph = props.pets;

    const addSymbols = (e) => {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

        if (order > suffixes.length - 1)
            order = suffixes.length - 1;

        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", 
        backgroundColor:"#f3f5f9",
        toolbar:{
            backgroundColor:"#f3f5f9",
        },
        title: {
            text: "Numbers of Customers / Pets",
            fontSize:20
        },
        axisY: {
            title: "Number of Customers / Pets",
            labelFormatter: addSymbols
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "All Customers", y: customersGraph.length},
                { label: "All Pets", y: petsGraph.length},



            ]
        }]
    }



    return(
         <CanvasJSChart options={options} />
    )
}

export default GraphCustomer;