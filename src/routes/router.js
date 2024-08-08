const router = require("express").Router();
const authRouter = require("./auth");
const postRouter = require("./post");
const userRouter = require("./user");
const {authenticateJWT} = require("../middlewares/jwt");

router.use('/auth', authRouter);
router.use('/post', authenticateJWT, postRouter);
router.use('/user', authenticateJWT, userRouter);

module.exports = router;
