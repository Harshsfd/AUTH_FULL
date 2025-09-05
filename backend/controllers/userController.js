/**
 * GET /api/users/profile
 * Protected route (authMiddleware)
 */
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // set in authMiddleware
    res.json({ id: user._id, name: user.name, email: user.email, mobile: user.mobile, createdAt: user.createdAt });
  } catch (err) {
    console.error('PROFILE ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
