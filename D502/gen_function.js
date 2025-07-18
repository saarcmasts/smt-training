function* genRandom() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

const genFunction = genRandom();

for (let index = 0; index < 10; index++) {
    const element = genFunction.next();
    console.log(element.value);
}