import * as repository from './apiRepository';
import Api from './interfaces/Api';

export const getAllApis = async (_, res) => {
    const apiList = await repository.getAllApis();

    res.status(200).json(apiList);
};

export const getApiById = async (req, res) => {
    const api = await repository.getApiById(req.params.id);

    res.status(200).json(api);
};

export const insertApi = async (req, res) => {
    const api: Api = req.body;

    await repository.insertApi(api);

    res.status(201).json(api);
};
