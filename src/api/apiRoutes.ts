import express from 'express';
import * as controller from './apiController';

const router = express.Router();

router.get('/', controller.getAllApis);
router.get('/:id', controller.getApiById);

export default router;
