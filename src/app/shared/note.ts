import {Example} from './example';

export class Note {
    word: string;
    meaning: string;
    comment: string;
    examples: Example[];
    practice: boolean;
    timestamps: string;
    pronounce: string;
    recording: string;
}