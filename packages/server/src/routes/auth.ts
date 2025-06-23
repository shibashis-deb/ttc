import express from 'express';

const router = express.Router();

// Placeholder for auth routes
router.get('/status', (req, res) => {
  res.json({ status: 'Auth router is set up' });
});

export default router;
