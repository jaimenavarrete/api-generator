import ResourceSearch from './interfaces/ResourceSearch';
import { getApiBySlug } from '../api/apiRepository';
import {
    getResourceBySlug,
    getResourcePropertiesById,
} from '../resource/repository/resourceRepository';

export const getResourceItems = async (search: ResourceSearch) => {
    const api = await getApiBySlug(search.apiSlug);
    const resource = await getResourceBySlug(search.resourceSlug, api!.id);
    const properties = await getResourcePropertiesById(resource!.id);

    console.log(properties);
};
