const map = [6, 0, 1, 2, 3, 4, 5]

function getDay() {
    return map[new Date().getDay()];
}

export {getDay};
