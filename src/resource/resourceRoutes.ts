import express from 'express';
import * as controller from './resourceController';

const router = express.Router();

router.get('/', controller.getAllResources);

export default router;
