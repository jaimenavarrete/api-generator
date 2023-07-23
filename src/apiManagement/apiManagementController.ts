import * as repository from './apiManagementRepository';

export const getResourceItems = (req, _res) => {
    const { apiSlug, resourceSlug } = req.params;

    repository.getResourceItems(apiSlug, resourceSlug);
};
