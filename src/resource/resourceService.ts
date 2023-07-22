import slugify from 'slugify';
import Resource from './interfaces/Resource';
import * as repository from './repository/resourceRepository';
import crypto from 'crypto';
import { slugifyOptions } from '../common/helpers/slugifyOptions';

export const getAllResources = async () => await repository.getAllResources();

export const getResourceById = async (id: string) =>
    await repository.getResourceById(id);

export const insertResource = async (resource: Resource) => {
    resource.id = crypto.randomUUID();
    resource.slug = slugify(resource.name, slugifyOptions);
    resource.tableCode = '_' + crypto.randomUUID().replace(/-/g, '');
    resource.creationDate = new Date();

    resource.properties = resource.properties!.map((property) => {
        property.id = crypto.randomUUID();
        return property;
    });

    await repository.insertResource(resource);
};
