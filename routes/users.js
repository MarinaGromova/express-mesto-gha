const router = require('express').Router();
const {
  getUsers,
  addUser,
  getUserById,
  updateUsersInfo,
  updateUsersAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', addUser);
router.patch('/me', updateUsersInfo);
router.patch('/me/avatar', updateUsersAvatar);

module.exports = router;
