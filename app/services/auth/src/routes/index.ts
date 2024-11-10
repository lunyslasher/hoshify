import {Router} from 'express';

const router = Router();

router.get(`/test`, async (req, res) => {
    res.status(200).json({message: `Working`});
})

export default router;