class Student {

    scores = [];

    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    addScore(score) {
        this.scores.push(score);
        return this; // Return 'this' to allow method chaining
    }

    getAverage() {
        if (this.scores.length === 0) return 0;
        const total = this.scores.reduce((acc, score) => acc + score, 0);
        return total / this.scores.length;
    }

}

const raja = new Student('Raja');

console.log(
    raja.addScore(89)
        .addScore(92)
        .addScore(76)
        .getAverage()
); // Output: 85.66666666666667