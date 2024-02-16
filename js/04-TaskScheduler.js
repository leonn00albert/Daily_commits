/*
   Automated Task Scheduler
   
   This Node.js script automates task scheduling based on predefined criteria.
   Users can define tasks, frequency, and execution conditions. The script
   monitors task schedules and executes them automatically when due.
   
   Requirements:
   1. Node.js for server-side scripting.
   2. Task scheduling mechanism with task name, frequency, and conditions.
   3. Data structure or database for task storage.
   4. Continuous script execution for schedule monitoring.
   5. Logic to check and execute tasks based on frequency and conditions.
   6. Error handling during task execution.
   7. Dynamic task addition, modification, or removal.
   8. Optional logging for task execution history.
   9. Security measures to prevent unauthorized access.
   10. Unit tests for easy testing and maintenance.
   
   Example Tasks:
   - Task 1: Send reminder email every Monday at 9:00 AM.
   - Task 2: Clean up temp files every Friday at 11:00 PM.
   - Task 3: Update database entry on 1st day of month at 12:00 AM.
   - Task 4: Generate and export report daily at 6:00 AM.
*/

class TaskScheduler {
    constructor() {
   
        this.file = new TaskFile();
    }

    addTask(task) {
        this.file.add(task);
    }

    removeTask(taskName) {
        this.file.remove(taskName);
    }

    executeTasks() {
        const now = new Date();
        let tasks = this.file.readTasks();
        tasks.forEach((task) => {
             task = new Task(task.name, task.frequency, task.conditions, task.action);
            if (task.isDue(now)) {
                try {
                    task.execute();
                } catch (error) {
                    console.error(`Error executing task: ${task.name}`, error);
                }
            }
        });
    }

}

class Task {
    constructor(name, frequency, conditions, action) {
        this.name = name;
        this.frequency = frequency;
        this.conditions = conditions;
        this.action = action;
    }

    humanReadableFrequency(frequency) {
        const { day, hour, minute } = this.frequency;
        if (frequency === 'daily') {

        }
        else if (frequency === 'weekly') {
            return `Every ${this.getDayName(day)} at ${hour}:${minute}`;
        }
        else if (frequency === 'monthly') {
            return `Every 1st day of month at ${hour}:${minute}`;
        }
        else {
            return `Every ${day} at ${hour}:${minute}`;
        }
    }

    isDue(date) {
        const { day, hour, minute } = this.frequency;
        return this.checkDate(date, day, hour, minute);
    }
    checkDate(date, day, hour, minute) {
        return date.getDay() === day && date.getHours() === hour && date.getMinutes() === minute;
    }

    execute() {
        this.action();
    }

 
}

class Runner {
    constructor() {
        this.scheduler = new TaskScheduler();
    }

    checkDate(date, day, hour, minute) {
        return date.getDay() === day && date.getHours() === hour && date.getMinutes() === minute;
    }

    run() {
        setInterval(() => {
            this.scheduler.executeTasks();
        }, 1000);
    }
}

// File-based JSON database to store tasks and their parsed dates
class TaskFile {
    constructor() {
        this.fs = require('fs');
        this.fileName = 'files/tasks.json';

        if (!this.fs.existsSync(this.fileName)) {
            this.createFile();
        }
    }

    createFile() {
        this.fs.writeFileSync(this.fileName, '[]');
    }

    readTasks() {
        return JSON.parse(this.fs.readFileSync(this.fileName, 'utf8'));
    }

    writeTasks(tasks) {
        this.fs.writeFileSync(this.fileName, JSON.stringify(tasks));
    }

    add(task) {
        const tasks = this.readTasks();
        tasks.push(task);
        this.writeTasks(tasks);
    }

    remove(taskName) {
        const tasks = this.readTasks();
        const newTasks = tasks.filter((task) => task.name !== taskName);
        this.writeTasks(newTasks);
    }
}

// Unit tests
function runTests() {
    const task = new Task('Test Task', { day: 1, hour: 9, minute: 0 }, {}, () => console.log('Testing task'));
    if (task.name !== 'Test Task') {
        throw new Error('Task name is incorrect');
    }
    if (!task.isDue(new Date('2024-02-19T09:00:00'))) {
        throw new Error('Task is not due when expected');
    }
    console.log('All tests passed successfully');
}

// Example usage
const runner = new Runner();
runner.scheduler.addTask(new Task('Send reminder email', { day: 1, hour: 9, minute: 0 }, {}, () => console.log('Sending email')));
runner.scheduler.addTask(new Task('Clean up temp files', { day: 5, hour: 23, minute: 0 }, {}, () => console.log('Cleaning up files')));
runner.scheduler.addTask(new Task('Send reminder email', { day: 5, hour: 8, minute: 13 }, {}, () => console.log('Sending email')));
runner.run();
runTests();
