'use client';

import React from "react"

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { playSoundEffect } from '@/lib/sounds';

export function Contact() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSoundEffect('success');
    // In production, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const content = {
    en: {
      title: 'Get In Touch',
      subtitle: 'We\'d love to hear from you. Send us a message!',
      phone: '+216 20 091 961',
      email: 'contact.fikrflow@gmail.com',
      nameLabel: 'Name',
      emailLabel: 'Email',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      sendBtn: 'Send Message',
      successMsg: 'Message sent successfully!',
      contactInfo: 'Contact Information',
    },
    ar: {
      title: 'تواصل معنا',
      subtitle: 'نحب أن نسمع منك. أرسل لنا رسالة!',
      phone: '+216 20 091 961',
      email: 'contact.fikrflow@gmail.com',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      subjectLabel: 'الموضوع',
      messageLabel: 'الرسالة',
      sendBtn: 'إرسال الرسالة',
      successMsg: 'تم إرسال الرسالة بنجاح!',
      contactInfo: 'معلومات الاتصال',
    },
  };

  const curr = content[language];

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="glow-neon text-4xl md:text-5xl font-bold mb-4">{curr.title}</h2>
          <p className="text-foreground/60 text-lg">{curr.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="glow-box p-8 rounded-xl border border-accent/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  {curr.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Your name' : 'اسمك'}
                  className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent/60 focus:bg-card/80 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  {curr.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'your@email.com' : 'بريدك@example.com'}
                  className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent/60 focus:bg-card/80 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  {curr.subjectLabel}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Project inquiry' : 'استفسار عن المشروع'}
                  className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent/60 focus:bg-card/80 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  {curr.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Your message...' : 'رسالتك...'}
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent/60 focus:bg-card/80 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="glow-button w-full py-3 rounded-lg font-semibold transition-all"
              >
                {curr.sendBtn}
              </button>

              {submitted && (
                <div className="p-4 bg-accent/20 border border-accent/40 rounded-lg text-accent text-center">
                  {curr.successMsg}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 glow-neon">
                {curr.contactInfo}
              </h3>
            </div>

            <a
              href="tel:+21620091961"
              className="glow-box p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all group cursor-pointer block"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-all">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">
                    {language === 'en' ? 'Phone' : 'الهاتف'}
                  </p>
                  <p className="text-accent font-semibold text-lg">{curr.phone}</p>
                </div>
              </div>
            </a>

            <a
              href="mailto:contact.fikrflow@gmail.com"
              className="glow-box p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all group cursor-pointer block"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-all">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </p>
                  <p className="text-accent font-semibold text-lg">{curr.email}</p>
                </div>
              </div>
            </a>

            <div className="glow-box p-6 rounded-xl border border-accent/20">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-accent/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">
                    {language === 'en' ? 'Founded' : 'تأسست في'}
                  </p>
                  <p className="text-accent font-semibold text-lg">2025</p>
                </div>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  language === 'en'
                    ? 'glow-button'
                    : 'bg-card border border-accent/30 text-foreground hover:border-accent/60'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  language === 'ar'
                    ? 'glow-button'
                    : 'bg-card border border-accent/30 text-foreground hover:border-accent/60'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
