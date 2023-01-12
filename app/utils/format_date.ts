import { assert, time } from "console";

export default function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    const dateString = date.toDateString();
    return dateString;
}