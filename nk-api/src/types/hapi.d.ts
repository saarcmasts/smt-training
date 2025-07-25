import "@hapi/hapi";

declare module "@hapi/hapi" {
    interface ServerMethods {
        add: (a: number, b: number) => number;
    }
}