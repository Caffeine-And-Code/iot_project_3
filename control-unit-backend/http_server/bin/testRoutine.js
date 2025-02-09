const {processTemperature, resolveAlarm} = require("../services/stateService")

const testRoutine = (i = 0) =>
{return
    switch (i) {
        case 1:
            processTemperature(10)
            break;
        case 2:
            processTemperature(30)
            break
        case 3:
            processTemperature(50)
            break
        case 4:
            processTemperature(41)
            break
        case 5:
            processTemperature(45)
            break
        case 6:
            processTemperature(49)
            break
        case 7:
            processTemperature(30)
            break
        case 8:
            resolveAlarm()
            break
        case 9:
            processTemperature(35)
            break
        default:
            break;
    }

    setTimeout(() => {
        testRoutine(i+1)
    }, 2000);
}

module.exports = testRoutine