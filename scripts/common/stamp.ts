export function toDateStamp(d: Date): number {
    return 10000 * d.getFullYear() + 100 * (d.getMonth() + 1) + d.getDate();
}

export function fromDateStamp(s: number): Date {
    const year = Math.floor(s / 10000);
    const month = Math.floor((s % 10000) / 100) - 1;
    const day = Math.floor(s % 100);
    return new Date(year, month, day);
}
