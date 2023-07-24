import ResourceSearch from './interfaces/ResourceSearch';
import { getApiBySlug } from '../api/apiRepository';
import {
    getResourceBySlug,
    getResourcePropertiesById,
} from '../resource/repository/resourceRepository';
import * as repository from './apiManagementRepository';

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
