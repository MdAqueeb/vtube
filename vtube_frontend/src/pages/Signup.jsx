import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { register as registerApi } from '../api/authApi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid';
    if (!formData.password) newErrors.password = 'Required';
    else if (formData.password.length < 6) newErrors.password = 'At least 6 chars';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Not matching';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { user, token } = await registerApi({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      login(user, token);
      // Toast message success is handled by Axios interceptor
    } catch (error) {
      // Error toast message is handled by Axios interceptor
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-red-500/30">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-red-600/30">
            <UserPlus className="text-red-500" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Join Vtube</h1>
          <p className="text-zinc-500 text-sm mt-3 font-medium">Create your storyteller identity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="name"
            name="name"
            placeholder="johndoe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            className="group"
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            className="group"
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button 
            type="submit" 
            className="w-full h-12 rounded-2xl text-md font-black shadow-lg shadow-red-600/20 active:scale-[0.98]" 
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm font-medium">
            Already a member?{' '}
            <Link to="/login" className="text-red-500 font-black hover:text-red-400 transition-colors tracking-wide uppercase text-xs ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
