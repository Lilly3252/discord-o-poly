import { MonopolyEventPayloads } from '#type/event';
import { EventEmitter } from 'events';



class MonopolyEvents extends EventEmitter {
    on<K extends keyof MonopolyEventPayloads>(event: K, listener: (payload: MonopolyEventPayloads[K]) => void): this {
        return super.on(event, listener);
    }

    emit<K extends keyof MonopolyEventPayloads>(event: K, payload: MonopolyEventPayloads[K]): boolean {
        return super.emit(event, payload);
    }
}

const monopolyEvents: MonopolyEvents = new MonopolyEvents();
export default monopolyEvents;