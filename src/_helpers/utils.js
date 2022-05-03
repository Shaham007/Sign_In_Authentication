
export const currentTime = () => {
            const timeNow = new Date();
            const hours = (timeNow.getHours() + 11) % 12 + 1;
            const minutes = timeNow.getMinutes();
            return hours + ' : ' + minutes + ' ' + (hours >= 12 ? "Am" : "PM");
}