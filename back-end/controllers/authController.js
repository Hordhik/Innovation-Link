// Hardcoded users for demo
const users = [
  { username: 'manikant', password: '1234', role: 'startup' },
  { username: 'arcuser', password: '1234', role: 'startup' },
  { username: 'luciduser', password: '1234', role: 'startup' },
  // Investor users
  { username: 'investor1', password: '1234', role: 'investor' },
  { username: 'investor2', password: '1234', role: 'investor' },
  { username: 'investor3', password: '1234', role: 'investor' },
];

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Return a dummy token and user info
    res.json({ token: 'dummy_token', user: { username: user.username, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
