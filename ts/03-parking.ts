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


class Vehicle {
    private licensePlate: string;
    private brand: string;
    private color: string;
    constructor() {
        this.color = this.generateColor();
        this.brand = this.generateBrand();
        this.licensePlate = this.generateLicensePlate();
    }
    generateLicensePlate() {
        let plateNumber = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Letters and numbers to choose from
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            plateNumber += characters[randomIndex];
        }
        return plateNumber;
    }
    generateBrand() {
        const brands = [
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

        const randomIndex = Math.floor(Math.random() * brands.length);
        return brands[randomIndex];
    }
    generateColor() {
        const colors = [
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
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    getLicensePlate(): string {
        return this.licensePlate;
    }
}

class ParkingSpot {
    private spotNumber: number;
    private occupied: boolean = false;
    private vehicle: Vehicle | null = null;

    constructor(spotNumber: number) {
        this.spotNumber = spotNumber;
    }

    fill(vehicle: Vehicle): this {
        this.vehicle = this.vehicle;
        this.occupied = true
        return this;
    }
    empty() {
        this.vehicle = null;
        this.occupied = false;
        return this;
    }
    status(): object {
        return {
            vehicle: this.vehicle,
            occupied: this.occupied
        };
    }
    isOccupied() {
        return this.occupied;
    }

    vehicleParked() {
        return this.vehicle;
    }

}

class ParkingLot {
    private totalSpots: number = 0;
    private availableSpots: number = 0;
    private parkedVehicles: Vehicle[] = [];
    private parkingSpots: ParkingSpot[] = [];

    constructor(totalSpots: number) {
        this.totalSpots = totalSpots;
        this.availableSpots = totalSpots;
        for (let i:number = 0;i < totalSpots; i++) {
            this.parkingSpots.push(new ParkingSpot(i))
        }
    }

    parkVehicle(vehicle: Vehicle) {
        const spot: ParkingSpot | undefined = this.parkingSpots.find((s) => s.isOccupied() == false);

        if (spot) {
            spot?.fill(vehicle);
            this.availableSpots--;
            this.parkedVehicles.push(vehicle);
        }
    }

    retrieveVehicle(licensePlate: string) {
        const vehicle: Vehicle | null | undefined = this.parkingSpots.find((s) => s.vehicleParked()?.getLicensePlate() == licensePlate)?.vehicleParked();
        return vehicle;
    }
    

    displayAvailableSpots() {
        return this.availableSpots;
    }
    

}

const garage = new ParkingLot(10);
garage.parkVehicle(new Vehicle());
garage.parkVehicle(new Vehicle());
garage.parkVehicle(new Vehicle());
garage.parkVehicle(new Vehicle());
console.log(garage.displayAvailableSpots()); //should be 6