'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { X, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const galleryData = [
  { id: 1, category: 'Pipelines', tag: 'Gazoduc 24"', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0630-Copy.jpg' },
  { id: 2, category: 'Montage', tag: 'Génie Mécanique', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0634.jpg' },
  { id: 3, category: 'Soudure', tag: 'ASME IX / API 1104', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0636.jpg' },
  { id: 4, category: 'Chaudronnerie', tag: 'Échangeur de Pression', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/PHOTO-2024-08-23-18-37-13-6.jpg' },
  { id: 5, category: 'Soudure', tag: 'Qualité 100% NDT', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/PHOTO-2024-09-10-13-56-57-1.jpg' },
  { id: 6, category: 'Pipelines', tag: 'Soudure Ligne Principal', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/PHOTO-2024-08-23-19-00-49-Copie-Copie.jpg' },
  { id: 7, category: 'Montage', tag: 'Montage sur Site', src: 'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0658.jpg' },
  { id: 8, category: 'Matériels', tag: 'Sideboom Pipeline', src: 'https://www.jhonpipeline.com/wp-content/uploads/2025/03/PHOTO-REALISATIONS-ET-MATERIELS-JHON-PIPELINE_Page_1.jpg' },
  { id: 9, category: 'Matériels', tag: 'Logistique Terrain', src: 'https://www.jhonpipeline.com/wp-content/uploads/2025/03/PHOTO-REALISATIONS-ET-MATERIELS-JHON-PIPELINE_Page_3-1.jpg' },
];

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filteredItems = activeFilter === 'Tous'
    ? galleryData.map((item, i) => ({ ...item, ...t.gallery.items[i] }))
    : galleryData.filter(item => item.category === activeFilter).map((item) => {
        const idx = galleryData.indexOf(item);
        return { ...item, ...t.gallery.items[idx] };
      });

  return (
    <section id="gallery" className="py-24 bg-background text-foreground border-b border-border/50 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center gap-4 mb-16">
          <CustomBadge>{t.gallery.badge}</CustomBadge>
          <CustomTitle>{t.gallery.title}</CustomTitle>
          <CustomSubtitle className="text-muted-foreground">{t.gallery.subtitle}</CustomSubtitle>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {t.gallery.categories.map((cat) => (
            <Button
              key={cat.key}
              variant={activeFilter === cat.key ? 'default' : 'outline'}
              onClick={() => setActiveFilter(cat.key)}
              className="rounded-xl px-5 py-2 font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} whileHover={{ y: -5 }} className="group relative rounded-2xl overflow-hidden border border-border shadow-md bg-card aspect-video cursor-pointer" onClick={() => setSelectedImage(item.src)}>
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">[{item.tag}]</span>
                    <Maximize2 className="size-4 text-zinc-300" />
                  </div>
                  <h4 className="text-base font-bold uppercase tracking-tight mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-300 line-clamp-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />
            <Button className="absolute top-6 right-6 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white size-10 flex items-center justify-center cursor-pointer z-55" onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}>
              <X className="size-5" />
            </Button>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3 }} className="relative max-w-5xl max-h-[80vh] overflow-hidden rounded-2xl border border-zinc-800 p-1 bg-zinc-900/30 backdrop-blur-md shadow-2xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} alt="JHON PIPELINE" className="max-w-full max-h-[75vh] object-contain rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
