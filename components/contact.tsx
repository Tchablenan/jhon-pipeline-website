'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { CustomBadge } from '@/components/custom/badge';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { CustomTitle } from '@/components/custom/title';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t.contact.validation.nameMin),
    email: z.string().email(t.contact.validation.emailInvalid),
    subject: z.string().min(5, t.contact.validation.subjectMin),
    message: z.string().min(10, t.contact.validation.messageMin),
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Server error');
      toast(t.contact.toast.successTitle, { description: t.contact.toast.successDesc });
      form.reset();
    } catch {
      toast(t.contact.toast.errorTitle, { description: t.contact.toast.errorDesc });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t.contact.info.emailTitle,
      content: 'infos@jhonpipeline.com',
      href: 'mailto:infos@jhonpipeline.com',
    },
    {
      icon: Phone,
      title: t.contact.info.phoneTitle,
      content: `+225 25 23 00 31 26\n+225 07 13 24 24 86 (${lang === 'fr' ? 'Urgence' : 'Emergency'})\n+225 07 13 43 43 13`,
      href: null,
    },
    {
      icon: MapPin,
      title: t.contact.info.addressTitle,
      content: t.contact.info.address,
      href: null,
    },
    {
      icon: Clock,
      title: t.contact.info.hoursTitle,
      content: t.contact.info.hours,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background text-foreground border-b border-border/50 relative overflow-hidden">
      <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 w-[300px] h-[300px] bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center flex-col text-center gap-4 mb-20"
        >
          <CustomBadge>{t.contact.badge}</CustomBadge>
          <CustomTitle>{t.contact.title}</CustomTitle>
          <CustomSubtitle className="text-muted-foreground max-w-[750px]">
            {t.contact.subtitle}
          </CustomSubtitle>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-foreground mb-4 uppercase tracking-wide leading-tight">
                {t.contact.heading}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.contact.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-5 bg-card/30 rounded-xl border border-border hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors"
                >
                  <div className="size-10 bg-card rounded-lg flex items-center justify-center border border-border text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                    <info.icon className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1 uppercase tracking-wide">
                      {info.title}
                    </h4>
                    {info.href ? (
                      <Link href={info.href} className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 text-sm whitespace-pre-line transition-colors">
                        {info.content}
                      </Link>
                    ) : (
                      <p className="text-muted-foreground text-sm whitespace-pre-line">
                        {info.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card className="border-border bg-card/40 backdrop-blur-md rounded-2xl relative p-2 shadow-2xl">
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-zinc-300 dark:border-zinc-700/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-zinc-300 dark:border-zinc-700/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-zinc-300 dark:border-zinc-700/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-zinc-300 dark:border-zinc-700/60 pointer-events-none" />

              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.contact.form.name}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.contact.form.namePlaceholder}
                                {...field}
                                className="bg-background border-border text-foreground rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-400/80 focus-visible:border-cyan-500 dark:focus-visible:border-cyan-400/80 transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.contact.form.email}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.contact.form.emailPlaceholder}
                                type="email"
                                {...field}
                                className="bg-background border-border text-foreground rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-400/80 focus-visible:border-cyan-500 dark:focus-visible:border-cyan-400/80 transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.contact.form.subject}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.contact.form.subjectPlaceholder}
                              {...field}
                              className="bg-background border-border text-foreground rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-400/80 focus-visible:border-cyan-500 dark:focus-visible:border-cyan-400/80 transition-colors"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.contact.form.message}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t.contact.form.messagePlaceholder}
                              className="min-h-[140px] bg-background border-border text-foreground rounded-xl focus-visible:ring-1 focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-400/80 focus-visible:border-cyan-500 dark:focus-visible:border-cyan-400/80 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      size="lg"
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold tracking-wider rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer h-12 flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>{t.contact.form.submitting}</span>
                      ) : (
                        <>
                          <span>{t.contact.form.submit}</span>
                          <Send className="size-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
