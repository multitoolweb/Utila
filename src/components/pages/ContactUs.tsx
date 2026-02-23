import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMsg(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setResponseMsg('Failed to connect to the server');
    }
  };

  return (
    <div className="prose prose-slate max-w-none">
      <h1>Contact Us</h1>
      <p>We would love to hear from you! Whether you have a question about features, pricing, trials, or anything else, our team is ready to answer all your questions.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
        <div className="p-6 bg-black/[0.02] border border-black/5 rounded-2xl text-center">
          <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-black/40" size={24} />
          </div>
          <h3 className="font-bold mb-1">Email Us</h3>
          <a 
            href="mailto:nbudha679@gmail.com" 
            className="text-sm text-black/60 hover:text-black transition-colors underline decoration-black/10 underline-offset-4"
          >
            nbudha679@gmail.com
          </a>
        </div>
        <div className="p-6 bg-black/[0.02] border border-black/5 rounded-2xl text-center">
          <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-black/40" size={24} />
          </div>
          <h3 className="font-bold mb-1">Live Chat</h3>
          <p className="text-sm text-black/60">Available 24/7</p>
        </div>
        <div className="p-6 bg-black/[0.02] border border-black/5 rounded-2xl text-center">
          <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-black/40" size={24} />
          </div>
          <h3 className="font-bold mb-1">Office</h3>
          <p className="text-sm text-black/60">Digital Nomad, World</p>
        </div>
      </div>
      
      <h2>Send us a message</h2>
      
      {status === 'success' ? (
        <div className="not-prose p-8 bg-emerald-50 border border-emerald-100 rounded-[32px] text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-emerald-900">Message Sent!</h3>
          <p className="text-emerald-700">{responseMsg}</p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
          >
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="not-prose space-y-4 max-w-lg">
          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
              <AlertCircle size={18} />
              {responseMsg}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold mb-2">Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-black/[0.02] border border-black/10 rounded-xl outline-none focus:border-black transition-all" 
              placeholder="Your Name" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-black/[0.02] border border-black/10 rounded-xl outline-none focus:border-black transition-all" 
              placeholder="your@email.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Message</label>
            <textarea 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 bg-black/[0.02] border border-black/10 rounded-xl outline-none focus:border-black h-32 transition-all resize-none" 
              placeholder="How can we help?"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-black/80 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
