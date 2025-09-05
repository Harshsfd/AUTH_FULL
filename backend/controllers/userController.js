export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({ id: user._id, name: user.name, email: user.email, mobile: user.mobile, createdAt: user.createdAt });
  } catch (err) {
    console.error('PROFILE ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
