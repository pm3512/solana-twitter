export default interface Tweet {
    author_display: string,
    topic?: string,
    content: string,
    created_ago: string,
    created_at: string,
    timestamp: number
}