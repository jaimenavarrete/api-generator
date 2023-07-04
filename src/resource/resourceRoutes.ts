import express from 'express';
import * as controller from './resourceController';

const router = express.Router();

router.get('/', controller.getAllResources);
router.get('/:id', controller.getResourceById);
router.post('/', controller.insertResource);

export default router;
