const R = require('ramda');

/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const isColor = (color) => R.equals(R.__, color);
const colorFilter = (color) => R.filter(isColor(color), R.__);

const getColoredFiguresCount = (color) => R.compose(
    R.length,
    R.keys,
    colorFilter(color)
);

const checkCountFigures = (color, count) => R.compose(
    R.gte(R.__, count),
    getColoredFiguresCount(color)
);

const curriedCheckCountFigures = R.curry(checkCountFigures);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = R.where({
    star: R.equals('red'),
    square: R.equals('green'),
    triangle: R.equals('white'),
    circle: R.equals('white')
});

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => curriedCheckCountFigures('green')(2)(figures);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    const redFiguresCount = getColoredFiguresCount('red')(figures);
    const blueFiguresCount = getColoredFiguresCount('blue')(figures);
    return R.equals(redFiguresCount, blueFiguresCount);
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 =  R.where({
    star: R.equals('red'),
    square: R.equals('orange'),
    circle: R.equals('blue')
});

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    const checkThreeFigures = curriedCheckCountFigures(R.__, 3);
    const threeRedFigures = checkThreeFigures('red');
    const threeBlueFigures = checkThreeFigures('blue');
    const threeGreenFigures = checkThreeFigures('green');
    const threeOrangeFigures = checkThreeFigures('orange');
    const isValid = R.anyPass([threeRedFigures, threeGreenFigures, threeBlueFigures, threeOrangeFigures]);
    return isValid(figures);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => {
    const checkTwoFigures = curriedCheckCountFigures(R.__, 2);
    const checkOneFigure = curriedCheckCountFigures(R.__, 1);
    const twoGreenFigures = checkTwoFigures('green');
    const oneRedFigure = checkOneFigure('red');
    const hasGreenTriangle = R.propEq('triangle', 'green');
    const isValid = R.allPass([twoGreenFigures, hasGreenTriangle, oneRedFigure]);
    return isValid(figures);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = R.where({
    star: R.equals('orange'),
    square: R.equals('orange'),
    triangle: R.equals('orange'),
    circle: R.equals('orange')
});

// 8. Не красная и не белая звезда.
export const validateFieldN8 = ({ star }) => {
    const redOrWhite = R.converge(R.or, [isColor('red'), isColor('white')]);
    const isValid = R.compose(
        R.not,
        redOrWhite
    );
    return isValid(star);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = R.where({
    star: R.equals('green'),
    square: R.equals('green'),
    triangle: R.equals('green'),
    circle: R.equals('green')
});


// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = ({ triangle, square }) => {
    const isSameColors = R.equals(R.__, square);
    const isNotWhite = R.compose(
        R.not,
        isColor('white')
    );
    const isValid = R.converge(R.and, [isSameColors, isNotWhite]);
    return isValid(triangle);
};
