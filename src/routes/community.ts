import { Router } from 'express';
import { asyncHandler } from '../middleware/index';
import { CommunityController } from '../controllers/CommunityController';

const router = Router();
const communityController = new CommunityController();

router.get(
  '/stories',
  asyncHandler(async (req, res) => {
    await communityController.listStories(req, res);
  })
);

router.get(
  '/stories/:id',
  asyncHandler(async (req, res) => {
    await communityController.getStory(req, res);
  })
);

router.post(
  '/stories/:id/view',
  asyncHandler(async (req, res) => {
    await communityController.incrementView(req, res);
  })
);

router.post(
  '/stories/:id/like',
  asyncHandler(async (req, res) => {
    await communityController.likeStory(req, res);
  })
);

router.post(
  '/stories/:id/save',
  asyncHandler(async (req, res) => {
    await communityController.saveStory(req, res);
  })
);

export default router;
