
/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
const R = require('ramda');

const api = new Api();

const lessThanTenSymbols = R.compose(
    R.lt(R.__, 10),
    R.length
);

const moreThanTwoSymbols = R.compose(
    R.gt(R.__, 2),
    R.length
);

const numIsPositive = R.compose(
    R.gt(R.__, 0),
    parseFloat
);

const onlyNumbers = R.compose(
    R.gt(R.__, 0),
    R.length,
    R.match(/^[0-9]+\.{0,1}[0-9]*$/)
);

const isValid = R.allPass(
    [lessThanTenSymbols, moreThanTwoSymbols, numIsPositive, onlyNumbers]
);

const validateString = async (str) => (
    isValid(str) ? str : Promise.reject('ValidationError')
);

const getNum = async (str) => R.compose(
    Math.round,
    parseFloat
)(str);

const transformNum = async (num) => (
    api.get("https://api.tech/numbers/base", {
        from: 10,
        to: 2,
        number: num,
    })
    .then(({ result }) => result)
);

const sqrNum = async (num) => Math.pow(num, 2);

const getRemainderOfThree = R.modulo(R.__, 3);

const getAnimal = async (num) => (
    api.get(`https://animals.tech/${num}`, {})
    .then(({result}) => result)
);

const applyValue = (fn) => async (value) => R.tap(fn, value);

const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
    const process = R.composeP(
        applyValue(writeLog),
        getAnimal,
        applyValue(writeLog),
        getRemainderOfThree,
        applyValue(writeLog),
        sqrNum,
        applyValue(writeLog),
        R.length,
        applyValue(writeLog),
        transformNum,
        applyValue(writeLog),
        getNum,
        validateString,
        applyValue(writeLog)
    );

    process(value).catch(err => handleError(err));
}

export default processSequence;
