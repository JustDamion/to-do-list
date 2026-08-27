function getEndOfMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
}

function getEndOfWeek() {
    const date = new Date();
    const lastDay = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastDay)).toISOString();
}

function getDifferenceInDays(isoStringOne, isoStringTwo) {
    const date1 = new Date(isoStringOne);
    const date2 = new Date(isoStringTwo);

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function getCurrentDateIso() {
    return new Date().toISOString();
}

export { getCurrentDateIso, getEndOfWeek, getEndOfMonth, getDifferenceInDays }