export interface IEntity {
    id: number;
    name?: string;
    created: Date;
    modified: Date;
    rowVersion: string;
}