import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LifeBuoy, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error('Email is required');
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.info('Reset link sent if account exists');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LifeBuoy className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-zinc-500 text-sm mt-2">Enter your email to receive a password reset link</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Button 
              type="submit" 
              className="w-full h-11 text-md" 
              loading={loading}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center py-6 bg-zinc-950 rounded-xl border border-zinc-800">
            <p className="text-white font-semibold">Check your email!</p>
            <p className="text-zinc-500 text-sm mt-2 px-6">We've sent a recovery link to your inbox. Please check your spam folder if you don't see it.</p>
            <Button 
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="mt-6"
            >
              Didn't receive? Try again
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <Link to="/login" className="text-zinc-500 text-sm flex items-center justify-center gap-2 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
