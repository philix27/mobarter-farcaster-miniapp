export function convertToWAT(utcDate: Date | string) {
    // Convert to a Date object
    const date = new Date(utcDate);

    // Format in WAT (West Africa Time, UTC+1)
    const options:Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos", // WAT timezone
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit"
    };

    const watDate = date.toLocaleString("en-US", options);
    return watDate // 👉 "09/09/2025, 10:15:35 AM"
}