import * as service from './apiManagementService';
import ResourceSearch from './interfaces/ResourceSearch';

export const getResourceItems = async (req, res) => {
    const { apiSlug, resourceSlug }: ResourceSearch = req.params;

    const resourceItems = await service.getResourceItems({
        apiSlug,
        resourceSlug,
    });

    res.status(200).json(resourceItems);
};

export const insertResourceItem = async (req, _res) => {
    const { apiSlug, resourceSlug }: ResourceSearch = req.params;

    await service.insertResourceItem({ apiSlug, resourceSlug }, req.body);
};
