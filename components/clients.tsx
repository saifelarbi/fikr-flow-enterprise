'use client';

import { useState } from 'react';
import Image from 'next/image';
import { playSoundEffect } from '@/lib/sounds';

export function Clients() {
  const [language] = useState<'en' | 'ar'>('en');

  const clients = [
    {
      name: 'Strato Data',
      logo: 'https://strato-data.netlify.app/logo.png',
      url: 'https://strato-data.netlify.app/',
      descEn: 'Data analytics and insights platform',
      descAr: 'منصة تحليل البيانات والرؤى',
    },
    {
      name: 'Noqta',
      logo: 'https://noqta.tn/logo.png',
      url: 'https://noqta.tn/',
      descEn: 'Digital solutions provider',
      descAr: 'مزود الحلول الرقمية',
    },
  ];

  const title = language === 'en' ? 'Our Clients' : 'عملاؤنا';
  const subtitle = language === 'en'
    ? 'Trusted by leading companies'
    : 'موثوق من قبل الشركات الرائدة';

  return (
    <section className="py-20 px-4 bg-card/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="glow-neon text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-foreground/60 text-lg">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {clients.map((client, idx) => (
            <a
              key={idx}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-panel p-8 rounded-xl border border-accent/30 hover:border-accent/70 transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => playSoundEffect('hover')}
              onClick={() => playSoundEffect('click')}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-24 h-24 relative bg-card/50 rounded-lg p-3 group-hover:bg-card transition-all">
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 rounded flex items-center justify-center">
                    <span className="text-accent/60 group-hover:text-accent text-sm font-bold transition-colors">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="text-accent/40 group-hover:text-accent transition-colors text-2xl">→</div>
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                {client.name}
              </h3>

              <p className="text-foreground/60 text-sm mb-4">
                {language === 'en' ? client.descEn : client.descAr}
              </p>

              <div className="flex items-center gap-2 text-accent/60 group-hover:text-accent text-sm transition-colors">
                <span>Visit Website</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 p-8 glow-box border border-accent/20 rounded-xl text-center">
          <p className="text-foreground/70 mb-4">
            {language === 'en'
              ? 'We\'ve helped multiple companies achieve their digital transformation goals'
              : 'ساعدنا عدة شركات على تحقيق أهداف التحول الرقمي الخاصة بها'}
          </p>
          <p className="text-accent font-semibold">
            {language === 'en'
              ? 'Founded in 2025 • Growing with innovation'
              : 'تأسست في 2025 • نحو النمو بالابتكار'}
          </p>
        </div>
      </div>
    </section>
  );
}
