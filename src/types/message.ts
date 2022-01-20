export interface MessageType {
    content: string;
    author: {
        id: string;
        bot: boolean;
        send: (message: string | object) => void;
        username: string;
    };
    channel: {
        id: string;
        send: (message: string | object) => void;
    };
    delete: () => void;
}
