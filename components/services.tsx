'use client';

import { useState } from 'react';
import { Code, Database, Zap } from 'lucide-react';
import { playSoundEffect } from '@/lib/sounds';

export function Services() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Code,
      titleEn: 'Software Development',
      titleAr: 'تطوير البرمجيات',
      descEn: 'Custom software solutions tailored to your business needs. From web applications to mobile platforms.',
      descAr: 'حلول برمجية مخصصة تناسب احتياجات عملك. من تطبيقات الويب إلى المنصات المحمولة.',
      features: ['Web Apps', 'Mobile Apps', 'Custom Solutions'],
      featuresAr: ['تطبيقات ويب', 'تطبيقات محمولة', 'حلول مخصصة']
    },
    {
      icon: Database,
      titleEn: 'Data Engineering',
      titleAr: 'هندسة البيانات',
      descEn: 'Transform your data into actionable insights. ETL pipelines, data warehousing, and analytics solutions.',
      descAr: 'حول بيانات عملك إلى رؤى قابلة للتنفيذ. خطوط أنابيب البيانات والمستودعات والحلول التحليلية.',
      features: ['ETL Pipelines', 'Data Warehousing', 'Analytics'],
      featuresAr: ['خطوط الأنابيب', 'المستودعات', 'التحليلات']
    },
    {
      icon: Zap,
      titleEn: 'IoT Solutions',
      titleAr: 'حلول إنترنت الأشياء',
      descEn: 'Connect and manage IoT devices. Real-time monitoring, automation, and intelligent systems.',
      descAr: 'توصيل وإدارة أجهزة الاستشعار. المراقبة الفورية والأتمتة والأنظمة الذكية.',
      features: ['Device Management', 'Real-time Monitoring', 'Automation'],
      featuresAr: ['إدارة الأجهزة', 'المراقبة الفورية', 'الأتمتة']
    },
  ];

  const title = language === 'en' ? 'Our Services' : 'خدماتنا';

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="glow-neon text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {language === 'en'
              ? 'Comprehensive solutions for digital transformation'
              : 'حلول شاملة للتحول الرقمي'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = hoveredService === idx;
            const title = language === 'en' ? service.titleEn : service.titleAr;
            const desc = language === 'en' ? service.descEn : service.descAr;
            const features = language === 'en' ? service.features : service.featuresAr;

            return (
              <div
                key={idx}
                onMouseEnter={() => {
                  setHoveredService(idx);
                  playSoundEffect('hover');
                }}
                onMouseLeave={() => setHoveredService(null)}
                className={`cyber-panel p-8 rounded-xl border transition-all duration-300 cursor-pointer transform ${
                  isHovered
                    ? 'scale-105 border-accent/70 bg-card/50 shadow-2xl'
                    : 'border-accent/30 bg-card/20'
                }`}
              >
                <div className={`inline-block p-4 rounded-lg mb-6 transition-all ${
                  isHovered ? 'bg-accent/30 scale-110' : 'bg-accent/10'
                }`}>
                  <Icon className={`w-8 h-8 ${isHovered ? 'text-accent' : 'text-accent/60'}`} />
                </div>

                <h3 className={`text-xl font-bold mb-4 transition-colors ${
                  isHovered ? 'text-accent glow-neon' : 'text-foreground'
                }`}>
                  {title}
                </h3>

                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {desc}
                </p>

                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 transition-all ${
                        isHovered ? 'translate-x-2' : ''
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        isHovered ? 'bg-accent' : 'bg-accent/40'
                      }`} />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
