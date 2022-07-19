import React from 'react';
import CanvasjsReact from "../../js/graphs_js/canvasjs.react";

function GraphGenderPet(props) {

let female = 0;
let male = 0;
let dogF = 0;
let catF = 0;
let dogM = 0;
let catM = 0;
props.pets.map(item=> {

    if(item.pet_gender === "Female"){
        female++;
        if(item.type_of_pet === "Dog") dogF++;
        else catF++;
    }
    else if(item.pet_gender === "Male"){
        male++;
        if(item.type_of_pet === "Dog") dogM++;
        else catM++;
    }
    return item;
})

                
 
    let CanvasJSChart = CanvasjsReact.CanvasJSChart;



    var options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Pets Gender"              
        },
        axisY: {
            title: "Numbers Of Pets Gender",
        },
        data: [              
        {
            type: "column",
            dataPoints: [
                { label: "All Female",  y: female  },
                { label: "All Male", y: male  },
                { label: "Dogs Male", y: dogM  },
                { label: "Cats Male",  y: catM  },
                { label: "Dogs Female",  y: dogF  },
                { label: "Cats Female",  y: catF  }

            ]
        }
        ]
    }

    return (
        <CanvasJSChart options={options} />
    )
}

export default GraphGenderPet