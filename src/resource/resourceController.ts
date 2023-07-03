import * as repository from './resourceRepository';

export const getAllResources = async (_, res) => {
    const resourcesList = await repository.getAllResources();

    res.status(200).json(resourcesList);
};

export const getResourceById = async (req, res) => {
    const resource = await repository.getResourceById(req.params.id);

    res.status(200).json(resource);
};
