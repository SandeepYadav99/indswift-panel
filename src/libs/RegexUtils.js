
const isUrl = (value) => {
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(value);
}

const isEmail = (value) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(value);
}

const isAlphaNum = (value) => {
    return /^[a-zA-Z0-9. ]*$/.test(value);
}

const isAlpha = (value) => {
    return /^[a-zA-Z ]*$/.test(value);
}

const isNum = (value) => {
    return /^[0-9]*$/.test(value);
}

const isDate = (value) => {
        return value instanceof Date && !isNaN(value);
}

const isSpace = (value) => {
    return /\s/.test(value);
}

export {
    isUrl,
    isEmail,
    isAlphaNum,
    isNum,
    isAlpha,
    isDate,
    isSpace
};
