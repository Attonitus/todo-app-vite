import {v5 as uuid} from 'uuid';

export class Todo {
    constructor(description){
        this.id = uuid.URL;
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}