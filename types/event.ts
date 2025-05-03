export type Event = {
    id: number;
    name: string;
    area?: string;
    description: string;
    host: string;
    logo?: string
    dateStart: Date,
    dateEnd: Date
};

export const emptyEvent: Event = {
    id: 999999,
    name: '',
    area: '',
    dateEnd: new Date(),
    dateStart: new Date(),
    host: '',
    description: '',
    logo: "",
};

export type EventPayload = {
    name: string;
    dateStart: Date,
    dateEnd: Date
    area?: string;
    description: string;
    host: string;
    logo?: string
};
