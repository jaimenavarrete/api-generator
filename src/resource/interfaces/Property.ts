import { PropertyType } from '../enums/PropertyType';
import Type from './Type';

export default interface Property {
    id: string;
    name: string;
    typeId: PropertyType;
    resourceId: string;
    isKey: boolean;
    isNullable: boolean;
    defaultValue?: any;
    referencedKeyId?: string;
    creationDate: Date;
    lastModificationDate?: Date;

    type?: Type;
}
