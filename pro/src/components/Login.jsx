import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Link imported
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input::-ms-reveal,
      input::-ms-clear {
        display: none !important;
      }
      input[type="password"]::-webkit-credentials-auto-fill-button {
        display: none !important;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        box-shadow: 0 0 0px 1000px white inset !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:5000/api/login', { email, password })
        .then(res => {
          alert(res.data.message);
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/app');
        })
        .catch(err => alert(err.response?.data?.message || 'Login failed'));
    } catch (err) {
      alert('Error logging in');
    }
  };

  const passwordInputStyle = {
    ...styles.input,
    paddingRight: '40px',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            inputMode="text"
            style={passwordInputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <button type="submit" style={styles.button}>Login</button>
      </form>

      <div style={styles.signupPrompt}>
        <span>New user? </span>
        <button
          onClick={() => navigate('/signup')}
          style={styles.signupButton}
          type="button"
        >
          Create Account
        </button>
        <p style={{ marginTop: '10px' }}>
          Forgot your password?{' '}
          <Link to="/forgot-password" style={{ color: '#007BFF' }}>
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '350px',
    margin: '60px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #aaa',
    width: '100%',
    boxSizing: 'border-box',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '15px',
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: '12px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#444',
    userSelect: 'none',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  signupPrompt: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  signupButton: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    padding: 0,
    marginLeft: '5px',
  }
};

export default Login;
