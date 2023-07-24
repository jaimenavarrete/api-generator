import ResourceSearch from './interfaces/ResourceSearch';
import { getApiBySlug } from '../api/apiRepository';
import { getResourceBySlug } from '../resource/repository/resourceRepository';

export const getResourceItems = async (search: ResourceSearch) => {
    const api = await getApiBySlug(search.apiSlug);
    const resource = await getResourceBySlug(search.resourceSlug, api!.id);

    console.log(api);
    console.log(resource);
};
