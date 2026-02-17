'use client';

import { useState } from 'react';

export function Footer() {
  const [language] = useState<'en' | 'ar'>('en');

  const content = {
    en: {
      companyName: 'Fikr Flow',
      tagline: 'Innovation in Every Line of Code',
      copyright: '© 2025 Fikr Flow. All rights reserved.',
      quickLinks: 'Quick Links',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      followUs: 'Follow Us',
    },
    ar: {
      companyName: 'فكر فلو',
      tagline: 'الابتكار في كل سطر من الأكواد',
      copyright: '© 2025 فكر فلو. جميع الحقوق محفوظة.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      about: 'عن',
      contact: 'اتصل',
      followUs: 'تابعنا',
    },
  };

  const curr = content[language];

  return (
    <footer className="bg-card/40 border-t border-accent/20 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-accent mb-2">{curr.companyName}</h3>
            <p className="text-foreground/60 text-sm">{curr.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{curr.quickLinks}</h4>
            <ul className="space-y-2">
              {[curr.services, curr.about, curr.contact].map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-foreground/60 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{curr.followUs}</h4>
            <div className="flex gap-4">
              {['LinkedIn', 'Twitter', 'GitHub'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent/60 hover:text-accent transition-all text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">{curr.copyright}</p>
          <p className="text-foreground/50 text-sm">
            {language === 'en'
              ? 'Building the future, one project at a time.'
              : 'بناء المستقبل، مشروع تلو الآخر.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
