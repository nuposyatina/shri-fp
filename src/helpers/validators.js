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

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => {
    const isValid = R.where({
        star: R.equals('red'),
        square: R.equals('green'),
        triangle: R.equals('white'),
        circle: R.equals('white')
      });
    return isValid(figures);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
    const isGreen = (figure) => R.equals(figure, 'green');
    const filterGreenFigures = R.filter(isGreen, R.__);
    const isValid = R.compose(
        R.gte(R.__, 2),
        R.length,
        R.keys,
        filterGreenFigures
    )(figures);
    return isValid;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    const isRed = (figure) => R.equals(figure, 'red');
    const isBlue = (figure) => R.equals(figure, 'blue');
    const filterBlueFigures = R.filter(isBlue, R.__);
    const filterRedFigures = R.filter(isRed, R.__);
    const redFiguresCount = R.compose(
        R.length,
        R.keys,
        filterRedFigures
    )(figures)
    const blueFiguresCount = R.compose(
        R.length,
        R.keys,
        filterBlueFigures
    )(figures);
    return R.equals(redFiguresCount, blueFiguresCount);
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (figures) => {
    const isValid = R.where({
        star: R.equals('red'),
        square: R.equals('orange'),
        circle: R.equals('blue')
      });
    return isValid(figures);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
