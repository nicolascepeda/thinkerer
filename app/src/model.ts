export interface Topic {
    type : string;
    name : string;
}

export interface Message {
    role : "USER" | "ASSISTANT";
    content ?: string;
    topic ?: Topic;
}