import * as repository from './apiRepository';

export const getAllApis = async (_, res) => {
    const apiList = await repository.getAllApis();

    res.status(200).json(apiList);
};

export const getApiById = async (req, res) => {
    const api = await repository.getApiById(req.params.id);

    res.status(200).json(api);
};
