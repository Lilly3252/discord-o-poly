import { event } from "./types/event";
/**
 * Represents an event in the system.
 */
export default class Event {
    /**
     * The name of the event.
     */
    name!: event['name'];

    /**
     * The client associated with the event.
     */
    client!: event['client'];

    /**
     * Whether the event should be executed only once.
     */
    once!: event['once'];

    /**
     * The emitter of the event.
     */
    emitter!: event['emitter'];

    /**
     * Executes the event.
     * 
     * @param _args - Arguments for the event.
     * @returns A promise that resolves when the event execution is complete.
     * @throws An error if the run method is not implemented.
     */
    run(..._args: unknown[]): Promise<any> {
        throw new Error(`The run method has not been implemented in ${this.name}`);
    }
}
