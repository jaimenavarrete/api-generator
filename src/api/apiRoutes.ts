import express from 'express';
import controller from './apiController';

const router = express.Router();

router.get('/', controller.getAllApis);

export default router;
