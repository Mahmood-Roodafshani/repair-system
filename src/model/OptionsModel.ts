export default class OptionsModel {
    id: string;
    title: string;

    constructor({id = '', title = ''}: { id: string, title: string }) {
        this.id = id;
        this.title = title;
    }
}