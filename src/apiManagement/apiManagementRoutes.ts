import express from 'express';

import * as controller from './apiManagementController';

const router = express.Router();

router.get('/:apiSlug/:resourceSlug', controller.getResourceItems);
router.post('/:apiSlug/:resourceSlug', controller.insertResourceItem);

export default router;
