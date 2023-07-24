import * as service from './apiManagementService';
import ResourceSearch from './interfaces/ResourceSearch';

export const getResourceItems = async (req, _res) => {
    const { apiSlug, resourceSlug }: ResourceSearch = req.params;

    await service.getResourceItems({ apiSlug, resourceSlug });
};
