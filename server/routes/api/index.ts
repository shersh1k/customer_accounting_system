import * as express from 'express';
import users from './users';
import orders from './orders';
import notes from './notes';
import expenses from './expenses';

const router = express.Router();
router.use('/', users);
router.use('/orders', orders);
router.use('/notes', notes);
router.use('/expenses', expenses);

export default router;
