export function getDate() {
    var today = new Date();
    var sec = String(today.getUTCSeconds()).padStart(2, '0');
    var min = String(today.getUTCMinutes()).padStart(2, '0');
    var hour = String(today.getUTCHours()).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');
    var mouth = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();
    return "".concat(year, "-").concat(mouth, "-").concat(day, "T").concat(hour, ":").concat(min, ":").concat(sec, "+03:30");
}
