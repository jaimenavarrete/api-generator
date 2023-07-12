import { mapFromRequestBodyToResource } from './resourceMapper';
import * as service from './resourceService';

export const getAllResources = async (_, res) => {
    const resourcesList = await service.getAllResources();

    res.status(200).json(resourcesList);
};

export const getResourceById = async (req, res) => {
    const resource = await service.getResourceById(req.params.id);

    res.status(200).json(resource);
};

export const insertResource = async (req, res) => {
    const resource = mapFromRequestBodyToResource(req.body);

    await service.insertResource(resource);

    res.status(201).json(resource);
};
