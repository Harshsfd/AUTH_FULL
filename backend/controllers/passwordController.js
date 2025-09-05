import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';

/**
 * POST /api/auth/forgot-password
 * body: { email }
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If account exists, reset link will be sent' }); // avoid user enumeration

    // create token (store raw token for simplicity)
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const html = `<p>Hello ${user.name},</p>
      <p>You requested a password reset. Click below to set a new password (valid 1 hour):</p>
      <a href="${resetUrl}">Reset Password</a>`;

    await sendEmail(user.email, 'Password Reset Request', html);

    res.json({ message: 'Password reset link sent to email (if account exists)' });
  } catch (err) {
    console.error('FORGOT ERROR:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

/**
 * POST /api/auth/reset-password
 * body: { token, password }
 */
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    if (!token || !password) return res.status(400).json({ message: 'Token and new password required' });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful', token: generateToken(user._id) });
  } catch (err) {
    console.error('RESET ERROR:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
