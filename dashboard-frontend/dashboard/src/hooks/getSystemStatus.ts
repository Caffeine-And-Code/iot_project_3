enum SystemStatus{
    Normal = 0,
    Hot = 1,
    TooHot = 2,
    Alarm = 3
}

function getSystemStatus(): SystemStatus {
    //debug mode 
    const random = Math.floor(Math.random() * 4);
    return SystemStatus[random as keyof typeof SystemStatus];
}

export { SystemStatus, getSystemStatus };