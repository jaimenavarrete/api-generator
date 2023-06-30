import express from 'express';
import controller from './apiController';

const router = express.Router();

router.get('/', controller.getApis);

export default router;
