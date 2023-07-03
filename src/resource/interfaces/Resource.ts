export default interface Resource {
    id: string;
    name: string;
    slug: string;
    description: string;
    apiId: string;
    isBulkRemovable: boolean;
    creationDate: Date;
    lastModificationDate: Date;
}
