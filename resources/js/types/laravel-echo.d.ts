declare module "laravel-echo" {
    export interface Echo {
        channel(channel: string): Channel;
        private(channel: string): Channel;
        join(channel: string): PresenceChannel;
        leave(channel: string): void;
        socketId(): string;
    }

    export interface Channel {
        listen(event: string, callback: (data: any) => void): Channel;
        stopListening(event: string): Channel;
    }

    export interface PresenceChannel {
        here(callback: (data: any) => void): PresenceChannel;
        joining(callback: (data: any) => void): PresenceChannel;
        leaving(callback: (data: any) => void): PresenceChannel;
    }

    export default class Echo {
        constructor(options: {
            broadcaster: string;
            key: string;
            cluster?: string;
            forceTLS?: boolean;
            [key: string]: any;
        });
    }
}

declare global {
    interface Window {
        Echo: import("laravel-echo").default;
        Pusher: any;
    }
}
