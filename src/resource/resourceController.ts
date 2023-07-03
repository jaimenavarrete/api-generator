import * as repository from './resourceRepository';

export const getAllResources = async (_, res) => {
    const resourcesList = await repository.getAllResources();

    res.status(200).json(resourcesList);
};
