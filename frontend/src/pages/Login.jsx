import { useState } from 'react'; // Force reload
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { loginAsGuest, login, createAccount } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleGuestDemo = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const result = login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      const result = createAccount(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="login-background">
        <div className="grid-pattern"></div>
      </div>

      {/* Back to Home Button */}
      <button className="back-to-home" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      {/* Main Content */}
      <div className="login-container">
        {/* Logo/Brand Section */}
        <motion.div 
          className="login-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="brand-title">GreenPort</h1>
          <p className="brand-subtitle">Monitor your digital carbon footprint</p>
        </motion.div>

        {/* Login Card */}
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Guest Demo Button - Prominent */}
          <motion.button
            className="guest-demo-btn"
            onClick={handleGuestDemo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="demo-icon">👁️</span>
            <div className="demo-text">
              <span className="demo-title">View as Client</span>
              <span className="demo-subtitle">Explore with demo account</span>
            </div>
          </motion.button>

          {/* Divider */}
          <div className="divider">
            <span>or continue with</span>
          </div>

          {/* Mode Toggle */}
          <div className="mode-toggle">
            <button
              className={mode === 'login' ? 'active' : ''}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className={mode === 'signup' ? 'active' : ''}
              onClick={() => setMode('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required={mode === 'signup'}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Technical Demo Notice */}
          <div className="demo-notice">
            <span className="notice-icon">ℹ️</span>
            <p>This is a technical demo. Any credentials will work for demonstration purposes.</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Built with Spring Boot & React • Portfolio Project 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
