const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUsersInfo,
  updateUsersAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUsersInfo);
router.patch('/me/avatar', updateUsersAvatar);

module.exports = router;
