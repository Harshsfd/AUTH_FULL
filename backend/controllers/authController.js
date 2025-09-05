import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

/**
 * POST /api/auth/register
 * body: { name, email, password, mobile? }
 */
export const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, mobile });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

/**
 * POST /api/auth/login
 * body: { email, password }
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

/**
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  // frontend should delete token from storage.
  res.json({ message: 'Logged out' });
};
