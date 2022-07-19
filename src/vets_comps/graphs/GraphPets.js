import React from 'react';
import CanvasjsReact from "../../js/graphs_js/canvasjs.react";

function GraphPets(props) {


let dog = 0;
let cat = 0;


props.pets.map(item=> {
    if(item.type_of_pet === "Dog"){
        dog++;
    }
    else if(item.type_of_pet === "Cat"){
        cat++;
    } 
    
        return item;
    
})
 


    let CanvasJSChart = CanvasjsReact.CanvasJSChart;



    const options = {
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor: "#f3f5f9",
        toolbar: {
            backgroundColor: "#f3f5f9",
        },
        title: {
            text: "Numbers Of Dogs / Cats",
            fontSize: 20
        },
        subtitles: [{
            text: "Dogs/Cats",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            dataPoints: [
                { name: "Dogs", y: dog },
                { name: "Cats", y: cat }


            ]
        }]
    }

    return (
        <CanvasJSChart options={options} />
    )
}

export default GraphPets