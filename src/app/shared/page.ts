import {Note} from './note';

export class Page {
    _id: string;
    updateAt: string;
    notes: Note [];
    description: string;
}