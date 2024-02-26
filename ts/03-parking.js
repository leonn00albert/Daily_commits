/*
Exercise: Building a Parking System

Objective:
Create a TypeScript program to manage a parking system. The system should allow users to park vehicles, retrieve parked vehicles, and display the available parking spots.

Instructions:

1. Define a class `Vehicle` with the following properties:
   - `licensePlate` (string): License plate number of the vehicle.
   - `brand` (string): Brand of the vehicle.
   - `color` (string): Color of the vehicle.

2. Implement a class `ParkingSpot` with the following properties:
   - `spotNumber` (number): Unique identifier for the parking spot.
   - `occupied` (boolean): Indicates if the parking spot is occupied.
   - `vehicle` (Vehicle | null): Reference to the vehicle parked in the spot (null if unoccupied).

3. Implement a class `ParkingLot` with the following properties and methods:
   - `totalSpots` (number): Total number of parking spots in the parking lot.
   - `availableSpots` (number): Number of available parking spots.
   - `parkedVehicles` (Vehicle[]): Array to store parked vehicles.
   - `parkVehicle(vehicle: Vehicle): void`: Parks a vehicle in the parking lot if there is an available spot.
   - `retrieveVehicle(licensePlate: string): void`: Retrieves a vehicle from the parking lot based on its license plate.
   - `displayAvailableSpots(): void`: Displays the available parking spots in the parking lot.

4. Create an instance of `ParkingLot` and perform the following operations:
   - Park a few vehicles.
   - Retrieve a vehicle.
   - Display the available parking spots.
*/
var Vehicle = /** @class */ (function () {
    function Vehicle() {
        this.color = this.generateColor();
        this.brand = this.generateBrand();
        this.licensePlate = this.generateLicensePlate();
    }
    Vehicle.prototype.generateLicensePlate = function () {
        var plateNumber = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Letters and numbers to choose from
        for (var i = 0; i < 7; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            plateNumber += characters[randomIndex];
        }
        return plateNumber;
    };
    Vehicle.prototype.generateBrand = function () {
        var brands = [
            "Toyota",
            "Honda",
            "Ford",
            "Chevrolet",
            "BMW",
            "Mercedes-Benz",
            "Audi",
            "Volkswagen",
            "Tesla",
            "Hyundai",
            "Kia",
            "Nissan"
        ];
        var randomIndex = Math.floor(Math.random() * brands.length);
        return brands[randomIndex];
    };
    Vehicle.prototype.generateColor = function () {
        var colors = [
            "Red",
            "Green",
            "Blue",
            "Yellow",
            "Orange",
            "Purple",
            "Pink",
            "Brown",
            "Black",
            "White",
            "Gray",
            "Cyan"
        ];
        var randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    Vehicle.prototype.getLicensePlate = function () {
        return this.licensePlate;
    };
    return Vehicle;
}());
var ParkingSpot = /** @class */ (function () {
    function ParkingSpot(spotNumber) {
        this.occupied = false;
        this.vehicle = null;
        this.spotNumber = spotNumber;
    }
    ParkingSpot.prototype.fill = function (vehicle) {
        this.vehicle = this.vehicle;
        this.occupied = true;
        return this;
    };
    ParkingSpot.prototype.empty = function () {
        this.vehicle = null;
        this.occupied = false;
        return this;
    };
    ParkingSpot.prototype.status = function () {
        return {
            vehicle: this.vehicle,
            occupied: this.occupied
        };
    };
    ParkingSpot.prototype.isOccupied = function () {
        return this.occupied;
    };
    ParkingSpot.prototype.vehicleParked = function () {
        return this.vehicle;
    };
    return ParkingSpot;
}());
var ParkingLot = /** @class */ (function () {
    function ParkingLot(totalSpots) {
        this.totalSpots = 0;
        this.availableSpots = 0;
        this.parkedVehicles = [];
        this.parkingSpots = [];
        this.totalSpots = totalSpots;
        this.availableSpots = totalSpots;
        for (var i = 0; i < totalSpots; i++) {
            this.parkingSpots.push(new ParkingSpot(i));
        }
    }
    ParkingLot.prototype.parkVehicle = function (vehicle) {
        var spot = this.parkingSpots.find(function (s) { return s.isOccupied() == false; });
        if (spot) {
            spot === null || spot === void 0 ? void 0 : spot.fill(vehicle);
            this.availableSpots--;
            this.parkedVehicles.push(vehicle);
        }
    };
    ParkingLot.prototype.retrieveVehicle = function (licensePlate) {
        var _a;
        var vehicle = (_a = this.parkingSpots.find(function (s) { var _a; return ((_a = s.vehicleParked()) === null || _a === void 0 ? void 0 : _a.getLicensePlate()) == licensePlate; })) === null || _a === void 0 ? void 0 : _a.vehicleParked();
        return vehicle;
    };
    ParkingLot.prototype.displayAvailableSpots = function () {
        return this.availableSpots;
    };
    return ParkingLot;
}());
var garage = new ParkingLot(10);
garage.parkVehicle(new Vehicle());
garage.parkVehicle(new Vehicle());
garage.parkVehicle(new Vehicle());
garage.parkVehicle(new Vehicle());
console.log(garage.displayAvailableSpots()); //should be 6
