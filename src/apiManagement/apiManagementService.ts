import ResourceSearch from './interfaces/ResourceSearch';
import { getApiBySlug } from '../api/apiRepository';
import {
    getResourceBySlug,
    getResourcePropertiesById,
} from '../resource/repository/resourceRepository';
import * as repository from './apiManagementRepository';
import { PropertyType } from '../resource/enums/PropertyType';
import crypto from 'crypto';

export const getResourceItems = async (search: ResourceSearch) => {
    const api = await getApiBySlug(search.apiSlug);
    const resource = await getResourceBySlug(search.resourceSlug, api!.id);
    const properties = await getResourcePropertiesById(resource!.id);
    const propertyNames = properties!.map((property) => property.name);

    const resourceItems = await repository.getResourceItems(
        propertyNames!,
        resource!.tableCode
    );

    return resourceItems;
};

export const insertResourceItem = async (search: ResourceSearch, body: any) => {
    const api = await getApiBySlug(search.apiSlug);
    const resource = await getResourceBySlug(search.resourceSlug, api!.id);
    const properties = await getResourcePropertiesById(resource!.id);
    const itemValues: any = {};

    properties!.forEach((property) => {
        if (property.isKey && property.typeId === PropertyType.Id) {
            return;
        }

        if (property.isKey) {
            itemValues[property.name] = crypto.randomUUID();
        }

        itemValues[property.name] = body[property.name];
    });
};
