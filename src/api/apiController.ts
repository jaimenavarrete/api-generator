import * as repository from './apiRepository';

export const getAllApis = async (_, res) => {
    const apiList = await repository.getAllApis();

    res.status(200).json(apiList);
};
