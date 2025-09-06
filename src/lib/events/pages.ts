import umami from "@umami/node";



export class Events {
    static index = umami.track({ url: '/' });
}