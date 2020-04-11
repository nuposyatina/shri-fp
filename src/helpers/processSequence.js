
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

const validateString = async (str) => {
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
    const isValid = R.allPass([lessThanTenSymbols, moreThanTwoSymbols, numIsPositive, onlyNumbers]);
    return isValid(str) ? str : Promise.reject('ValidationError');
};

const getNum = async (str) => R.compose(
    Math.round,
    parseFloat
)(str);

const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
    const logValue = async (value) => R.tap(writeLog, value);
    const process = R.composeP(
        logValue,
        getNum,
        validateString,
        logValue
    );
    process(value).catch(err => handleError(err));
    // api.get('https://api.tech/numbers/base', {from: 2, to: 10, number: '01011010101'}).then(({result}) => {
    //     writeLog(result);
    // });

    // wait(2500).then(() => {
    //     writeLog('SecondLog')

    //     return wait(1500);
    // }).then(() => {
    //     writeLog('ThirdLog');

    //     return wait(400);
    // }).then(() => {
    //     handleSuccess('Done');
    // });
}

export default processSequence;
