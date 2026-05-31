'use client';

import { useState, useTransition } from 'react';
import { motion, Variants } from 'framer-motion';
import { Hammer, Lock, ExternalLink, Mail, Bug, Globe, ArrowDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";
import { subscribeToKit } from './actions/subscribe';

// --- CONFIGURACIÓN DE DATOS ---
const content = {
  es: {
    brand: {
      title: 'Marabunta Labs',
      tagline: 'Caos, código y construcción constante',
      description: 'Marabunta es un ejército de hormigas migratorias que no construye nidos permanentes, sino que avanza arrasando con todo. Este es mi laboratorio de experimentación personal: un avance imparable para lanzar productos sin mirar atrás.',
    },
    challenge: {
      badge: 'Misión Actual: Reto 2026',
      titlePrefix: '12 Proyectos en',
      titleSuffix: '12 Meses',
      subtitle: 'El objetivo es simple: construir y lanzar un producto tecnológico cada 30 días en público.',
      placeholder: 'Tu mejor email...',
      button: 'Seguir el reto',
      disclaimer: 'Únete a la marabunta y sé uno de los primeros en seguir el reto.',
    },
    common: {
      statusBuild: 'Construyendo',
      statusLaunched: 'Lanzado',
      viewProject: 'Ver Proyecto',
      footerKofi: 'Café',
      footerKofiTooltip: 'Invítame a un Ko-fi',
      footerCopyright: 'Marabunta Labs 2026 ©',
      footerBuildWith: 'Construido con',
      privacy: 'Privacidad',
      terms: 'Términos',
      contact: 'Contacto',
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    projectsData: [
      {
        title: 'CDK STACKMAP',
        desc: 'Extensión VS Code para visualizar infraestructura AWS CDK.',
        status: 'launched',
        link: 'https://marketplace.visualstudio.com/items?itemName=Marabunta.cdk-stackmap&ssr=false#overview',
        githubLink: 'https://github.com/marabunta-labs/cdk-stackmap'
      },
      {
        title: 'File Scout',
        desc: 'Extensión VS Code para buscar archivos de manera inteligente.',
        status: 'launched',
        link: 'https://marketplace.visualstudio.com/items?itemName=Marabunta.file-scout&ssr=false#overview',
        githubLink: 'https://github.com/marabunta-labs/file-scout'
      },
      {
        title: 'Movie to ASCII',
        desc: 'Convierte videos, GIFs e imágenes en arte ASCII.',
        status: 'launched',
        link: 'https://pypi.org/project/movie-ascii/',
        githubLink: 'https://github.com/marabunta-labs/movie-ascii'
      },
      { 
        title: 'T&C Ninja', 
        desc: 'ChatBot IA, tu asistente para entender términos y condiciones.', 
        status: 'launched', 
        link: 'https://tc-ninja.vercel.app/',
        githubLink: 'https://github.com/marabunta-labs/tc-ninja'
      },
      { 
        title: 'TeaserFlix',
        desc: 'Plataforma de scrolling con trailers',
        status: 'launched',
        link: 'https://teaserflix.vercel.app/',
        githubLink: 'https://github.com/marabunta-labs/teaserflix'
      },
      { title: '???', desc: 'Generador de Música', status: 'building', link: '#' },
      { title: '???', desc: 'Bot de Telegram', status: 'locked', link: '#' },
      { title: '???', desc: 'Gestor de QR', status: 'locked', link: '#' },
      { title: '???', desc: 'Herramienta de mensajería creativa', status: 'locked', link: '#' },
      { title: '???', desc: 'Aplicación web de mapas', status: 'locked', link: '#' },
      { title: '???', desc: 'Juego Web', status: 'locked', link: '#' },
      { title: '???', desc: 'Grand Finale', status: 'locked', link: '#' },
    ]
  },
  en: {
    brand: {
      title: 'Marabunta Labs',
      tagline: 'Chaos, code, and constant construction',
      description: 'Marabunta refers to a legion of army ants that do not build permanent nests but march constantly, devouring everything. This lab is my unstoppable march to launch personal projects without looking back.',
    },
    challenge: {
      badge: 'Current Mission: Challenge 2026',
      titlePrefix: '12 Projects in',
      titleSuffix: '12 Months',
      subtitle: 'The goal is simple: build and ship a tech product every 30 days in public.',
      placeholder: 'Your best email...',
      button: 'Get updates',
      disclaimer: 'Join the marabunta and be among the first to follow the challenge.',
    },
    common: {
      statusBuild: 'Building',
      statusLaunched: 'Launched',
      viewProject: 'View Project',
      footerKofi: 'Coffee',
      footerKofiTooltip: 'Buy me a Ko-fi',
      footerCopyright: 'Marabunta Labs 2026 ©',
      footerBuildWith: 'Built with',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    projectsData: [
      {
        title: 'CDK STACKMAP',
        desc: 'VS Code extension to visualize AWS CDK infrastructure.',
        status: 'launched',
        link: 'https://marketplace.visualstudio.com/items?itemName=Marabunta.cdk-stackmap&ssr=false#overview',
        githubLink: 'https://github.com/marabunta-labs/cdk-stackmap'
      },
      {
        title: 'File Scout',
        desc: 'VS Code extension to intelligently search for files.',
        status: 'launched',
        link: 'https://marketplace.visualstudio.com/items?itemName=Marabunta.file-scout&ssr=false#overview',
        githubLink: 'https://github.com/marabunta-labs/file-scout'
      },
      {
        title: 'Movie to ASCII',
        desc: 'Convert videos, GIFs, and images to ASCII art.',
        status: 'launched',
        link: 'https://pypi.org/project/movie-ascii/',
        githubLink: 'https://github.com/marabunta-labs/movie-ascii'
      },
      { 
        title: 'T&C Ninja',
        desc: 'AI ChatBot to assist with terms and conditions.',
        status: 'launched',
        link: 'https://tc-ninja.vercel.app/',
        githubLink: 'https://github.com/marabunta-labs/tc-ninja'
      },
      { 
        title: 'TeaserFlix',
        desc: 'Scrolling platform with trailers',
        status: 'launched',
        link: 'https://teaserflix.vercel.app/',
        githubLink: 'https://github.com/marabunta-labs/teaserflix'
      },
      { title: '???', desc: 'Music Generator', status: 'building', link: '#' },
      { title: '???', desc: 'Telegram Bot', status: 'locked', link: '#' },
      { title: '???', desc: 'QR Manager', status: 'locked', link: '#' },
      { title: '???', desc: 'Creative messaging', status: 'locked', link: '#' },
      { title: '???', desc: 'Maps web app', status: 'locked', link: '#' },
      { title: '???', desc: 'Web Game', status: 'locked', link: '#' },
      { title: '???', desc: 'Grand Finale', status: 'locked', link: '#' },
    ]
  }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};


export default function Home() {
    const socialLinks = [
      {
        href: 'https://x.com/marabunta_labs',
        label: 'X (Twitter)',
        icon: <FaXTwitter size={20} />,
        iconFooter: <FaXTwitter size={18} />,
      },
      {
        href: 'https://github.com/marabunta-labs',
        label: 'GitHub',
        icon: <FaGithub size={20} />,
        iconFooter: <FaGithub size={18} />,
      },
    ];
  const [lang, setLang] = useState<'es' | 'en'>('en'); 
  const t = content[lang];

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const [isPending, startTransition] = useTransition();
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const form = e.currentTarget;
        
        startTransition(async () => {
            const result = await subscribeToKit(formData);
            
            if (result.success) {
                setFormStatus({ type: 'success', message: result.message });
                form.reset();
            } else {
                setFormStatus({ type: 'error', message: result.message });
            }
            
            setTimeout(() => setFormStatus({ type: null, message: '' }), 5000);
        });
    };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto z-50 relative">
        <div className="flex gap-4">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-slate-500 hover:text-white transition-colors"
            >
              {item.icon}
            </a>
          ))}
        </div>
        <button 
          onClick={toggleLang}
          aria-label={`Switch language to ${lang === 'en' ? 'Spanish' : 'English'}`}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-indigo-500 text-sm font-mono transition-all active:scale-95"
        >
          <Globe size={14} />
          {lang.toUpperCase()}
        </button>
      </nav>

      {/* --- SECCIÓN 1: BRAND HERO --- */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-4xl mx-auto px-6 pt-10 pb-20 text-center z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]">
            <Bug size={48} className="text-indigo-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{t.brand.title}</h1>
        <p className="text-indigo-400 font-mono text-sm md:text-base mb-6 tracking-wide uppercase opacity-90">{t.brand.tagline}</p>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">{t.brand.description}</p>
        
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="mt-12 flex justify-center opacity-30"
        >
            <ArrowDown size={24} />
        </motion.div>
      </motion.section>

      {/* --- ELEMENTOS VISUALES DE TRANSICIÓN (Línea brillante) --- */}
      <div className="relative w-full z-20">
         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-900 pointer-events-none" />
         <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_30px_2px_rgba(99,102,241,0.5)] origin-center" 
         />
      </div>

      {/* --- SECCIÓN 2: CHALLENGE 2026 (CON ANIMACIÓN) --- */}
      <section className="relative bg-slate-900 pb-20 pt-20 overflow-hidden">
        <motion.div 
             initial={{ opacity: 0, scale: 1.1 }}
             whileInView={{ opacity: 0.05, scale: 1 }}
             transition={{ duration: 2 }}
             viewport={{ once: true }}
             className="absolute inset-0" 
             style={{ backgroundImage: 'radial-gradient(#a5b4fc 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </motion.div>

        {/* Contenedor Animado del Contenido */}
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }} // Se activa un poco antes de llegar
            className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
            <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-900/40 text-indigo-300 text-sm font-bold mb-8 border border-indigo-500/30 backdrop-blur-md shadow-lg shadow-indigo-500/10">
                    <Hammer size={18} />
                    <span className="text-lg font-bold">{t.challenge.badge}</span>
                </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              {t.challenge.titlePrefix}{" "}
              <span className="text-indigo-400 md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-indigo-400 md:to-cyan-400 inline-block">
                {t.challenge.titleSuffix}
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.challenge.subtitle}
            </motion.p>
            
            {/* Newsletter Box con efecto pop-up */}
            <motion.div 
                variants={fadeInUp}
                className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 max-w-lg mx-auto backdrop-blur-sm shadow-2xl relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 rounded-2xl animate-pulse-slow pointer-events-none"></div>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto mb-4 relative z-10">
                    <input 
                        name="email"
                        type="email" 
                        required
                        placeholder={t.challenge.placeholder} 
                        className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 w-full transition-all text-white placeholder:text-slate-600 disabled:opacity-50"
                        disabled={isPending}
                    />
                    <button 
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                        {isPending ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                <Mail size={18} /> {t.challenge.button}
                            </>
                        )}
                    </button>
                </form>

                {/* MENSAJES DE FEEDBACK (Error o Éxito) */}
                <div className="h-6 relative z-10" aria-live="polite"> 
                    {formStatus.type === 'success' && (
                        <p className="text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle size={14} /> {formStatus.message}
                        </p>
                    )}
                    {formStatus.type === 'error' && (
                        <p className="text-red-400 text-sm font-medium flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle size={14} /> {formStatus.message}
                        </p>
                    )}
                    {!formStatus.type && (
                        <p className="text-xs text-slate-500 font-medium">{t.challenge.disclaimer}</p>
                    )}
                </div>
            </motion.div>
        </motion.div>
      </section>

      {/* --- SECCIÓN 3: GRID DE PROYECTOS (CON ANIMACIÓN STAGGERED) --- */}
      <div className="bg-slate-900 pb-24">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto px-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projectsData.map((project, index) => (
                <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    className={`relative border rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        project.status === 'locked' 
                        ? 'bg-slate-950/40 border-slate-800/50 opacity-50' 
                        : 'bg-slate-950 border-slate-800 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 group transform hover:-translate-y-1'
                    }`}
                >
                <div>
                    <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                        {t.common.months[index]}
                    </span>
                    {project.status === 'locked' ? (
                        <Lock size={16} className="text-slate-600" />
                    ) : project.status === 'launched' ? (
                        <div className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle size={12} /> {t.common.statusLaunched}
                        </div>
                    ) : (
                        <div className="bg-amber-500/10 text-amber-400 text-xs px-2 py-1 rounded border border-amber-500/20 flex items-center gap-1 animate-pulse">
                        <Hammer size={12} /> {t.common.statusBuild}
                        </div>
                    )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 min-h-[40px]">
                    {project.desc}
                    </p>
                </div>

                {project.status !== 'locked' && (
                    <div className="flex justify-between items-center">
                      <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                      >
                      {t.common.viewProject} <ExternalLink size={14} className="ml-1" />
                      </a>
                      {project.githubLink && (
                        <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                        >
                        <FaGithub size={14} className="mr-1" /> GitHub
                        </a>
                      )}
                    </div>
                )}
                </motion.div>
            ))}
            </div>
        </motion.div>
      </div>
      
      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* COLUMNA 1 (IZQUIERDA): FIRMA Y COPYRIGHT */}
          <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
            
            {/* LÍNEA UNIFICADA: Texto + Botones */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-sm text-slate-400 font-mono">
              <span>{t.common.footerBuildWith}</span>
              
              {/* BOTÓN 1: KO-FI (Estilo Azul/Cian) */}
              <a 
                href="https://ko-fi.com/marabunta"
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400 transition-all cursor-pointer"
                title={t.common.footerKofiTooltip}
              >
                <SiKofi className="group-hover:animate-bounce-short" size={12} />
                <span className="font-bold text-xs">{t.common.footerKofi}</span>
              </a>

              <span>by</span>

              {/* BOTÓN 2: GITHUB USUARIO */}
              <a 
                  href="https://github.com/parodin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all cursor-pointer"
              >
                  <FaGithub size={12} />
                  <span className="font-bold text-xs">@parodin</span>
              </a>
            </div>

            {/* COPYRIGHT */}
            <div className="text-sm text-slate-400 font-mono">
              {t.common.footerCopyright}
            </div>
          </div>

          {/* COLUMNA 2 (CENTRO): LEGALES */}
          <div className="flex justify-center gap-6 text-sm text-slate-400 font-medium order-1 md:order-2">
            <a href="/privacy" className="text-slate-700 hover:text-slate-400 transition-colors">{t.common.privacy}</a>
            <a href="/terms" className="text-slate-700 hover:text-slate-400 transition-colors">{t.common.terms}</a>
            <a href="mailto:rodolerio@gmail.com" className="text-slate-700 hover:text-slate-400 transition-colors">{t.common.contact}</a>
          </div>

          {/* COLUMNA 3 (DERECHA): REDES SOCIALES */}
          <div className="flex justify-center md:justify-end gap-3 order-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800 hover:border-slate-700"
                aria-label={item.label}
              >
                {item.iconFooter}
              </a>
            ))}
          </div>

        </div>
      </footer>
    </main>
  );
}