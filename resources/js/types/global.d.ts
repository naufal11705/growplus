import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        Echo: import("laravel-echo").default;
        Pusher: any;
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

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

declare module "pusher-js" {
    interface Pusher {
        subscribe(channelName: string): Channel;
        unsubscribe(channelName: string): void;
        bind(eventName: string, callback: (...args: any[]) => void): void;
        unbind(eventName: string, callback?: (...args: any[]) => void): void;
        disconnect(): void;
        connect(): void;
    }

    interface Channel {
        bind(eventName: string, callback: (data: any) => void): void;
        unbind(eventName: string, callback?: (data: any) => void): void;
    }

    // global.d.ts
    declare module "pusher-js" {
        interface Channel {
            bind(eventName: string, callback: (data: any) => void): void;
            unbind(eventName: string, callback?: (data: any) => void): void;
            unsubscribe(): void;
        }

        interface Pusher {
            subscribe(channelName: string): Channel;
            unsubscribe(channelName: string): void;
            bind(eventName: string, callback: (...args: any[]) => void): void;
            unbind(
                eventName: string,
                callback?: (...args: any[]) => void
            ): void;
            disconnect(): void;
            connect(): void;
        }

        class Pusher implements Pusher {
            constructor(
                appKey: string,
                options: {
                    encrypted?: boolean;
                    cluster?: string;
                    [key: string]: any;
                }
            );
            subscribe(channelName: string): Channel;
            unsubscribe(channelName: string): void;
            bind(eventName: string, callback: (...args: any[]) => void): void;
            unbind(
                eventName: string,
                callback?: (...args: any[]) => void
            ): void;
            disconnect(): void;
            connect(): void;
        }

        export default Pusher;
    }
}
