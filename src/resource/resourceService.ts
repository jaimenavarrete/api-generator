import Resource from './interfaces/Resource';
import * as repository from './resourceRepository';
import crypto from 'crypto';

export const getAllResources = async () => await repository.getAllResources();

export const getResourceById = async (id: string) =>
    await repository.getResourceById(id);

export const insertResource = async (resource: Resource) => {
    resource.id = crypto.randomUUID();
    resource.creationDate = new Date();

    resource.properties = resource.properties!.map((property) => {
        let id = crypto.randomUUID();
        property.id = id;

        return property;
    });

    await repository.insertResource(resource);
};
