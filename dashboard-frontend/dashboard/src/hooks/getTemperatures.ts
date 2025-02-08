export default function getTemperatures() {
    // debug Mode
    // get a random number between 0 and 100
    const length = Math.floor(Math.random() * 10);
    // create an array of length length and fill it with random numbers
    const temperatures = Array.from({ length }, () => Math.random() * 100);
    return temperatures;
}