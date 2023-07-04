import Type from './Type';

export default interface Property {
    id: string;
    name: string;
    typeId: number;
    resourceId: string;
    isKey: boolean;
    isNullable: boolean;
    defaultValue: any;
    referencedKeyId: string;
    creationDate: Date;
    lastModificationDate?: Date;

    type?: Type;
}
