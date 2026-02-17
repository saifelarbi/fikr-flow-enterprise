'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { playSoundEffect } from '@/lib/sounds';

export function Hero() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = language === 'en'
    ? 'FIKR FLOW - Innovative Solutions'
    : 'فكر فلو - حلول مبتكرة';

  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        playSoundEffect('click');
      }, 50);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === fullText.length) {
      setIsTyping(false);
      playSoundEffect('success');
    }
  }, [displayedText, isTyping, fullText]);

  const content = {
    en: {
      subtitle: 'Software Development • Data Engineering • IoT Solutions',
      description: 'Transform your business with cutting-edge technology and innovative consulting services.',
      getStarted: 'Get Started',
      contact: 'Contact Us',
    },
    ar: {
      subtitle: 'تطوير البرمجيات • هندسة البيانات • حلول إنترنت الأشياء',
      description: 'حول عملك باستخدام التكنولوجيا المتقدمة والخدمات الاستشارية المبتكرة.',
      getStarted: 'ابدأ الآن',
      contact: 'اتصل بنا',
    }
  };

  const curr = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background elements with purple atmospheric lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-700/15 rounded-full blur-3xl" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Cyan glow lines decoration */}
      <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => {
              setLanguage('en');
              setDisplayedText('');
              playSoundEffect('click');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              language === 'en'
                ? 'glow-button'
                : 'bg-card/30 text-foreground border border-accent/30 hover:border-accent/60 hover:bg-card/50'
            }`}
            onMouseEnter={() => playSoundEffect('hover')}
          >
            EN
          </button>
          <button
            onClick={() => {
              setLanguage('ar');
              setDisplayedText('');
              playSoundEffect('click');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              language === 'ar'
                ? 'glow-button'
                : 'bg-card/30 text-foreground border border-accent/30 hover:border-accent/60 hover:bg-card/50'
            }`}
            onMouseEnter={() => playSoundEffect('hover')}
          >
            AR
          </button>
        </div>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 relative">
            <Image
              src="/images/fikr-logo.jpeg"
              alt="Fikr Flow Logo"
              width={128}
              height={128}
              className="w-full h-full object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Typing Title */}
        <h1 className="glow-neon text-4xl md:text-6xl font-bold mb-6 min-h-20">
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Subtitle */}
        <p className="text-accent text-lg md:text-xl mb-6 font-light tracking-wider">
          {curr.subtitle}
        </p>

        {/* Description */}
        <p className="text-foreground/80 text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          {curr.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            className="glow-button rounded-lg text-lg"
            onMouseEnter={() => playSoundEffect('hover')}
            onClick={() => playSoundEffect('click')}
          >
            {curr.getStarted}
          </button>
          <button
            className="px-8 py-4 rounded-lg text-lg font-semibold border-2 border-accent/50 text-accent hover:border-accent hover:bg-accent/10 transition-all"
            onMouseEnter={() => playSoundEffect('hover')}
            onClick={() => playSoundEffect('click')}
          >
            {curr.contact}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-accent/60 text-sm">▼</div>
        </div>
      </div>
    </section>
  );
}
