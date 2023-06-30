export default interface Api {
    id: string;
    name: string;
    slug: string;
    description: string;
    isPrivate: boolean;
    creationDate: Date;
    lastModificationDate: Date;
}
