let getRemainTime = (endTime, deviceTime, serverTime) => {
    let t = endTime - Date.parse(new Date()) + Date.parse(serverTime) - Date.parse(deviceTime);
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function getTime(cb) {
    var xmlHttp = new XMLHttpRequest();
    if (!xmlHttp) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.open("HEAD", location.href, false);
    xmlHttp.send();
    var severTime = new Date(xmlHttp.getResponseHeader("Date"));
    var deviceTime = new Date();
    cb(severTime, deviceTime);
    return severTime, deviceTime;
}

getTime((serverTime, deviceTime) => {

    let intervalTimer = setInterval(() => {
        var endTime = new Date(stopAt);
        let remainTime = getRemainTime(endTime, deviceTime, serverTime)
        console.log(remainTime)
        if (remainTime.total <= 7200000 && remainTime.total > 0) {
            console.log(endTime)
        } else if (remainTime.total <= 0) {
            clearInterval(intervalTimer);
            callFunc();
        }
    }, 1000)
})

//copy all of the script to browser console will be aromaticity run
//edit the following script to achieve your purpose
stopAt = "4 JUN 2018 23:30:00 GMT+8";
function callFunc() { // put what u want to run after time's over
    console.log("hello");
}
