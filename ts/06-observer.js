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
var WeatherData = /** @class */ (function () {
    function WeatherData() {
        this.observers = [];
    }
    WeatherData.prototype.register = function (observer) {
        try {
            this.observers.push(observer);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    WeatherData.prototype.remove = function () {
        return true;
    };
    WeatherData.prototype.notifyObservers = function (d) {
        this.observers.forEach(function (o) { return o.updateObserver(d); });
    };
    return WeatherData;
}());
var Display = /** @class */ (function () {
    function Display(d) {
        this.data = d;
    }
    Display.prototype.updateObserver = function (d) {
        this.data = d;
    };
    Display.prototype.getData = function () {
        return this.data;
    };
    return Display;
}());
var station = new WeatherData;
var display1 = new Display("2");
var display2 = new Display("20");
var display3 = new Display("10");
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
