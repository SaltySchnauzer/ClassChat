export declare type ChatMessage = {
    sender: string;
    content: string;
    time?: string;
};
export declare type ChatSocketMessage = {
    type: "sendmsg";
    content: string;
    chatID: string;
} | {
    type: "loadmsg";
    content: ChatMessage[];
    chatID: string;
} | {
    type: "updatemsg";
    content: ChatMessage;
    chatID: string;
} | {
    type: "ping";
} | {
    type: "anonname";
    name: string;
} | {
    type: "auth";
};
