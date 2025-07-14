import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject custom CSS into <head> to hide native password eye icon
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

  const getMissingCriteria = (pwd) => {
    const missing = [];
    if ((pwd.match(/[a-zA-Z]/g) || []).length < 6) missing.push('at least 6 letters');
    if (!/[A-Z]/.test(pwd)) missing.push('an uppercase letter');
    if (!/\d/.test(pwd)) missing.push('a digit');
    if (!/[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]/.test(pwd)) missing.push('a special character');
    return missing;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const missing = getMissingCriteria(password);
    if (missing.length > 0) {
      alert('Password must include ' + missing.join(', ') + '.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/signup', { email, password });
      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
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
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.title}>Signup</h2>

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
            inputMode="text"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={passwordInputStyle}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <button type="submit" style={styles.button}>Signup</button>
      </form>

      <div style={styles.loginPrompt}>
        Already have an account?{' '}
        <button onClick={() => navigate('/')} style={styles.loginLink}>
          Login
        </button>
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
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loginPrompt: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  loginLink: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    padding: 0,
  },
};

export default Signup;
