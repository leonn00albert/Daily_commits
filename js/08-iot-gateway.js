

class Gateway{
    constructor(){
        this.motionData = [true, false, true, true, false, true, true, true, true, false];
        this.energyData = [100, 110, 105, 120, 115, 130, 125, 135, 140, 145];
        this.humidityData = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
    }

    analyzeMotionData(data) {
        const totalMotionEvents = data.filter(event => event).length;
        console.log("Total Motion Events:", totalMotionEvents);

        if (totalMotionEvents > 0) {
            console.log("ALERT: Motion detected!");
        }
    }

    analyzeEnergyData(data) {
        const maxEnergy = Math.max(...data);
        const minEnergy = Math.min(...data);
        const averageEnergy = data.reduce((acc, curr) => acc + curr, 0) / data.length;

        console.log("Max Energy Consumption:", maxEnergy);
        console.log("Min Energy Consumption:", minEnergy);
        console.log("Average Energy Consumption:", averageEnergy.toFixed(2));

        const thresholdEnergy = 130; 
        if (maxEnergy >= thresholdEnergy) {
            console.log("ALERT: High energy consumption detected!");
        }
    }

    analyzeHumidityData(data) {
        const maxHumidity = Math.max(...data);
        const minHumidity = Math.min(...data);
        const averageHumidity = data.reduce((acc, curr) => acc + curr, 0) / data.length;

        console.log("Max Humidity:", maxHumidity);
        console.log("Min Humidity:", minHumidity);
        console.log("Average Humidity:", averageHumidity.toFixed(2));

        const thresholdHumidity = 80; // Set threshold humidity
        if (maxHumidity >= thresholdHumidity || minHumidity >= thresholdHumidity) {
            console.log("ALERT: High humidity detected!");
        }
    }

    analyzeData(){
        this.analyzeMotionData(this.motionData);
        this.analyzeEnergyData(this.energyData);
        this.analyzeHumidityData(this.humidityData);
    }

    getData = () => {
        return {
            motionData: this.motionData,
            energyData: this.energyData,
            humidityData: this.humidityData
        }
    }

    setData = (data) => {
        this.motionData = data.motionData;
        this.energyData = data.energyData;
        this.humidityData = data.humidityData;
    }

    publishData = () => {
        console.log("Publishing data to MQTT broker...");   
    }

    subscribeToCommands = (commands) => {
        console.log("Subscribing to commands from MQTT broker...");
        let data = {
            motionData: [true, true, true, true, true, true, true, true, true, true],
            energyData: [150, 160, 155, 170, 165, 180, 175, 185, 190, 195],
            humidityData: [100, 105, 110, 115, 120, 125, 130, 135, 140, 145]
        }
        switch (commands) {
            case "updateData":
                this.setData(data);
                break;
            case "getStatus":
                return this.getData();
            default:
                console.log("Invalid command");
        }
    }

    getStatus = () => {
        console.log("Gateway is online");
    }


}


const gateway = new Gateway();

gateway.analyzeData();
gateway.publishData();
gateway.subscribeToCommands(["updateData", "getStatus"]);