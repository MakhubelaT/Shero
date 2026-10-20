import React, { useState, useRef } from 'react';
import { Business, CATEGORIES } from '../data/businesses';
import { X, Upload, Check, AlertCircle, Building2, Mail, Globe, Sparkles } from 'lucide-react';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newBusiness: Business) => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Legal');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be under 3MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setErrors(prev => {
          const next = { ...prev };
          delete next.image;
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Company name is required.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please provide a brief company description.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate unique slug id
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `biz-${Date.now()}`;
    const id = `${slug}-${Date.now().toString().slice(-4)}`;

    const newBusiness: Business = {
      id,
      name: name.trim(),
      category,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      website: website.trim() || undefined,
      description: description.trim(),
      image: image || undefined,
      instagram: instagram.trim() || undefined,
      facebook: facebook.trim() || undefined,
      linkedin: linkedin.trim() || undefined,
      createdAt: new Date().toISOString(),
      featured: false
    };

    onAdd(newBusiness);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#170A24] border border-[#2A7F86]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-y-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DFB15B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#3EA6B0]">SHERO Directory</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              Add Your Business
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              List your enterprise in the SHERO Women's Forum official registry.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-sm">
          
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Company Name <span className="text-[#FF458F]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Maletsatsi Consulting & Legal"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-white text-sm placeholder:text-slate-500 outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-xs text-[#FF458F] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Category <span className="text-[#FF458F]">*</span>
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-white text-sm outline-none transition-colors"
            >
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat} className="bg-[#170A24] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Email, Phone & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info@business.co.za"
                className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-white text-xs placeholder:text-slate-500 outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-[11px] text-[#FF458F] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 072 123 4567"
                className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-white text-xs placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Website / Store URL
              </label>
              <input
                type="text"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-white text-xs placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Company Description <span className="text-[#FF458F]">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Tell our members and community about your products, services, and mission..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-white text-sm placeholder:text-slate-500 outline-none transition-colors resize-none"
            />
            {errors.description && (
              <p className="text-xs text-[#FF458F] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Business Logo / Image (Optional)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFile}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4 text-[#3EA6B0]" />
                <span>{image ? 'Change Selected Image' : 'Upload Image / Logo'}</span>
              </button>

              {image && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ready
                  </span>
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="text-xs text-slate-400 hover:text-red-400 ml-1 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-xs text-[#FF458F] mt-1">{errors.image}</p>
            )}
          </div>

          {/* Social Links (Optional) */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Social Media Handles (Optional)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                placeholder="Instagram: @handle"
                className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 focus:border-[#3EA6B0] text-white text-xs outline-none"
              />
              <input
                type="text"
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
                placeholder="Facebook page"
                className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 focus:border-[#3EA6B0] text-white text-xs outline-none"
              />
              <input
                type="text"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                placeholder="LinkedIn name"
                className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 focus:border-[#3EA6B0] text-white text-xs outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] hover:from-[#3397A0] hover:to-[#2A7F86] text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-[#2A7F86]/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save & Publish Listing</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
