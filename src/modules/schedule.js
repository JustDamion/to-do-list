export default class Schedule {
    static getEndOfMonth(isoString) {
        const date = new Date(isoString);
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
    }

    static getEndOfWeek(isoString) {
        const date = new Date(isoString);
        const lastDay = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastDay)).toISOString();
    }

    static getDifferenceInDays(isoStringOne, isoStringTwo) {
        const date1 = new Date(isoStringOne);
        const date2 = new Date(isoStringTwo);

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    static getCurrentDateIso() {
        return new Date().toISOString();
    }
}