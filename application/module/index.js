const METHODS = {};

METHODS.generateUID = function () {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);

    return firstPart + secondPart;
};

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length; // base is the length of the alphabet (58 in this case)

METHODS.encode = function(num){
    let encoded = '';

    while (num){
        const remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }

    return encoded;
};

METHODS.decode = function (str) {
    let decoded = 0;

    while (str){
        const index = alphabet.indexOf(str[0]);
        const power = str.length - 1;
        decoded += index * (Math.pow(base, power));
        str = str.substring(1);
    }

    return decoded;
};

module.exports = METHODS;