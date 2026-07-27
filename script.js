
    const finalTempText = document.getElementById("finalTemp");
    const tempDropText = document.getElementById("tempDrop");
    const roomDifferenceText = document.getElementById("roomDifference");
    const statusText = document.getElementById("statusText");
    const button = document.getElementById('simulateButton');
    const roomTemp = document.getElementById('roomTemp');
    const initialTemp = document.getElementById('initialTemp');
    const coolingConstant = document.getElementById('coolingConstant');
    const time = document.getElementById('time');
    const steamContainer = document.querySelector(".steam-container");
    const ctx = document.getElementById("temperatureChart");

const chart = new Chart(ctx, {
    type: "line",

    
    data: {
        labels: [],
        datasets: [{
            label: "Coffee Temperature",
            data: [],
            borderColor: "#5A8DEE",
            backgroundColor: "#5A8DEE33",
            tension: 0.35,
            fill: true,
            pointRadius: 0,

            options: {
            animation: {
                duration:1200
            }
        }
        
        }]
    }
});

    button.addEventListener("click", function() {
        
    const T = Number(initialTemp.value);
    const Ta = Number(roomTemp.value);
    const k = Number(coolingConstant.value);
    const t = Number(time.value);
    const finalTemperature = Ta + (T - Ta) * Math.exp(-k * t);
    const temperatureDrop = T - finalTemperature;
    const roomDifference = finalTemperature - Ta;
    let chartColor;
    if(finalTemperature > 80) {
        chartColor = "#FF0000";

    } else if(finalTemperature >= 40) {
        chartColor =  "#FFA500";

    } else {
        chartColor = "cyan";
    }

    const labels = [];
    const temperatures = [];

    for (let i = 0; i <= t; i += 0.1) {
        const tempAtTime = Ta + (T - Ta) * Math.exp(-k * i);
        labels.push(i.toFixed(1));
        temperatures.push(tempAtTime);
    }
    chart.data.labels = labels;
    chart.data.datasets[0].data = temperatures;
    chart.data.datasets[0].borderColor = chartColor;
    chart.data.datasets[0].pointBackgroundColor = chartColor;
    chart.data.datasets[0].pointBorderColor = chartColor;
    chart.data.datasets[0].backgroundColor = chartColor + "33";
    chart.update();



if (finalTemperature > 80) {

    
    steamContainer.className = "steam-container hot";
    statusText.textContent = "Hot";
    statusText.style.color = "#FF0000";

}

if (finalTemperature >= 40 && finalTemperature <= 80) {

    
    steamContainer.className = "steam-container warm"; 
    statusText.textContent = "Warm";
    statusText.style.color = "#FFA500";
       
    
}


if (finalTemperature < 40) {

    
    steamContainer.className = "steam-container cold"; 
    statusText.textContent = "Cold";
    statusText.style.color = "cyan";

}

finalTempText.textContent =
`${finalTemperature.toFixed(2)} °F`;

tempDropText.textContent =
`${temperatureDrop.toFixed(2)} °F`;

roomDifferenceText.textContent =
`${roomDifference.toFixed(2)} °F`;

});


