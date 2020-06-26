/** Number formatting functions for nicely displaying numbers, currency and time */
import numeral from 'numeral';

const currency = '$';
export function formatCurrency(value: number) {
    const formatter = generateFormatter(value, true);
    return numeral(Math.floor(value)).format(formatter);
}

export function formatNumber(value: number) {
    const formatter = generateFormatter(value, false);
    return numeral(Math.floor(value)).format(formatter);
}

function generateFormatter(value: number, includeCurrency: boolean) {
    let currencyPrefix = `${currency} `;
    if (!includeCurrency) {
        currencyPrefix = '';
    }
    let formatString = `(${currencyPrefix} 0 a)`;
    if (value > 1000) {
        formatString = `(${currencyPrefix} 0.00 a)`;
    }
    if (value > 1000000000000) {
        formatString = `0.000e+0`;
    }
    return formatString;
}

export function formatTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const hoursString = formatTimeUnit(hours);
    const minutesString = formatTimeUnit(minutes);
    const secondsString = formatTimeUnit(seconds);
    let finalString = '';
    if (hours > 0) {
        finalString += `${hoursString}:`;
    }
    if (minutes > 0) {
        finalString += `${minutesString}:`;
    }
    finalString += secondsString;
    return finalString;
}

function formatTimeUnit(value: number) {
    return value >= 10 ? String(value) : `0${value}`;
}
