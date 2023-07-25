import slugify from 'slugify';
import Resource from './interfaces/Resource';
import * as repository from './repository/resourceRepository';
import crypto from 'crypto';
import { slugifyOptions } from '../common/helpers/slugifyOptions';
import Property from './interfaces/Property';

export const getAllResources = async () => await repository.getAllResources();

export const getResourceById = async (id: string) =>
    await repository.getResourceById(id);

const createDefaultIdProperty = (resourceId: string) => ({
    id: crypto.randomUUID(),
    name: 'id',
    typeId: 1,
    resourceId: resourceId,
    isKey: true,
    isNullable: false,
    creationDate: new Date(),
});

const getValidatedProperties = (properties: Property[], resourceId: string) => {
    let keyCount = 0;

    properties = properties!.map((property) => {
        if (property.isKey) keyCount += 1;

        property.id = crypto.randomUUID();
        property.resourceId = resourceId;
        return property;
    });

    if (keyCount === 0) {
        properties = [createDefaultIdProperty(resourceId), ...properties];
    }

    return properties;
};

export const insertResource = async (resource: Resource) => {
    resource.id = crypto.randomUUID();
    resource.slug = slugify(resource.name, slugifyOptions);
    resource.tableCode = '_' + crypto.randomUUID().replace(/-/g, '');
    resource.creationDate = new Date();
    resource.properties = getValidatedProperties(
        resource.properties!,
        resource.id
    );

    await repository.insertResource(resource);
};
