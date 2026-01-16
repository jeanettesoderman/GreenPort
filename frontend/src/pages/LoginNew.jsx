import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import './LoginNew.css';

function LoginNew() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();

  const handleGuestDemo = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="simple-login-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      
      <ThemeToggle />
      
      <div className="login-wrapper">
        <div className="simple-login-box">
        <h1>GreenPort</h1>
        <p className="subtitle">Monitor your digital carbon footprint</p>
        
        <button type="button" className="demo-btn" onClick={handleGuestDemo}>
          <span>👁️</span>
          <div>
            <strong>View as Client</strong>
            <small>Explore with demo account</small>
          </div>
        </button>

        <div className="divider">OR CONTINUE WITH</div>

        <div className="toggle-btns">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="field">
              <label>NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}
          
          <div className="field">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="field">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="notice">
          ℹ️ This is a technical demo. Any credentials will work.
        </div>
        </div>
      </div>
    </div>
  );
}

export default LoginNew;
