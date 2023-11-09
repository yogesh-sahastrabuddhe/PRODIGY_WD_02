let isRunning = false;
let startTime;
let lapStartTime;
let interval;
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById('startStop').textContent = 'Start';
    } else {
        startTime = Date.now() - (lapStartTime || 0);
        interval = setInterval(updateDisplay, 10);
        document.getElementById('startStop').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    lapStartTime = 0;
    display.textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const lapTime = currentTime - lapStartTime;
        lapStartTime = currentTime;
        const lapItem = document.createElement('li');
        lapItem.className = 'lap-time';
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    }
}

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        '.' +
        String(milliseconds).padStart(3, '0')
    );
}
