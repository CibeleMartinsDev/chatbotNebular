export interface ChatMessage {

    text: string,
    date: Date,
    reply: boolean,
    type: string,
    files: any,
    user: {
        name: string,
        avatar: string,
    },

}