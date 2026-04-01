import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../api/authApi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
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
      const res = await loginApi(formData);
      console.log(res,"i am res");

      const user = res;
      const token = res.token; // adjust if backend sends token
      localStorage.setItem("token", token);

    login(user, token);
      console.log(user," login user details");
      // setTimeout(() => {
        if (user.role === 'admin' || user.role === 'ADMIN') {
          console.log("I enter in admin page");
          return navigate('/admin');
        } else if(user.role === 'user' || user.role === 'USER'){
          console.log("i enter in User role")
          return navigate('/');
        }
      // }, 0);

    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-red-500/30">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          {/* <div className="bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-red-600/30">
            <LogIn className="text-red-500" size={32} />
          </div> */}
          <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-500 text-sm mt-3 font-medium">Continue your journey with Vtube</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
          
          <div className="space-y-2">
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
            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-2xl text-md font-black shadow-lg shadow-red-600/20 active:scale-[0.98]" 
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In Now'}
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm font-medium">
            New here?{' '}
            <Link to="/signup" className="text-red-500 font-black hover:text-red-400 transition-colors tracking-wide uppercase text-xs ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
