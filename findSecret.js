const fs = require('fs');

function decodeBase(value, base) {
    return parseInt(value, base);
}

function parseInput(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    const keys = data.keys;
    const points = [];

    for (const key in data) {
        if (key !== 'keys') {
            const x = parseInt(key, 10);
            const base = parseInt(data[key].base, 10);
            const y = decodeBase(data[key].value, base);
            points.push({ x, y });
        }
    }
    return { keys, points };
}

function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                term *= xj / (xj - xi);
            }
        }
        constantTerm += term;
    }
    return Math.round(constantTerm);
}

function findSecret(filename) {
    const { keys, points } = parseInput(filename);
    const { k } = keys;
    const secret = lagrangeInterpolation(points, k);
    console.log(`Secret (constant term c): ${secret}`);
}

const filename1 = 'testcase1.json';
const filename2 = 'testcase2.json';

findSecret(filename1);
findSecret(filename2);
