/*
Exercise: Observer Design Pattern

Objective:
Implement the Observer design pattern in TypeScript.

Scenario:
You are building a weather application that needs to notify multiple displays when the weather conditions change. Each display should be updated with the latest weather data whenever it changes.

Instructions:
1. Define an interface named Subject with methods to register, remove, and notify observers.
2. Define an interface named Observer with a method to update the observer when subject state changes.
3. Implement a WeatherData class that acts as a Subject.
4. Implement different display classes that act as Observers and update their display when weather data changes.
5. Test the implementation by simulating weather changes and observing if all displays get updated accordingly.

*/



interface Subject {
    observers: Observer[]
    register(observer: Observer): boolean
    remove(): boolean
    notifyObservers(d:string): void
}

interface Observer {
    updateObserver(d:string): void
}

interface Subscriber {

}

class WeatherData implements Subject {
    observers: Observer[] = [];
    register(observer: Observer): boolean {
        try {
            this.observers.push(observer);
            return true;

        }
        catch (e) {
            return false;
        }
    }
    remove(): boolean {
        return true;
    }
    notifyObservers(d:string): void {
        this.observers.forEach(o => o.updateObserver(d));
    }
}

class Display implements Observer {
    private data:string;
    constructor(d:string){
        this.data = d;
    }
    updateObserver(d:string): void {
        this.data = d;
    }
    getData():string
    {
        return this.data;
    }
}

const station = new WeatherData;
const display1 = new Display("2");
const display2 = new Display("20");
const display3 = new Display("10");

console.log(display1.getData());
console.log(display2.getData());
console.log(display3.getData());
station.register(display1);
station.register(display2);
station.register(display3);

station.notifyObservers('2222');

console.log(display1.getData());
console.log(display2.getData());
console.log(display3.getData());
