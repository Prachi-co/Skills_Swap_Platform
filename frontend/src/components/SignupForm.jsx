import { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/signup', form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required /><br />
      <input name="email" placeholder="Email" onChange={handleChange} required /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
      <input name="location" placeholder="Location" onChange={handleChange} /><br />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

export default SignupForm;
