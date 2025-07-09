import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Inline styles to avoid external CSS dependencies
const styles = {
    container: {
        width: '100vw',
        overflowX: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    audio: { display: 'none' },
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        zIndex: 1000,
    },
    navInner: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navTitle: { fontSize: '1.75rem', fontWeight: '700', letterSpacing: '1px', margin: 0 },
    navList: { listStyle: 'none', display: 'flex', gap: '1.5rem', margin: 0, padding: 0 },
    navItem: { cursor: 'pointer', transition: 'color 0.3s', color: '#CBD5E1' },
    navItemHover: { color: '#10B981' },
    hero: { position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' },
    heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' },
    heroTextContainer: { position: 'absolute', bottom: '2rem', left: '2rem' },
    heroTitle: { fontSize: '2.5rem', margin: 0, lineHeight: '1.2' },
    heroButton: {
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#10B981',
        color: '#000',
        fontWeight: 600,
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s, background 0.3s',
    },
    gallerySection: { flex: 1, padding: '4rem 2rem' },
    galleryTitle: { fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' },
    galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' },
    galleryItem: { position: 'relative', overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' },
    galleryImage: { width: '100%', height: '200px', objectFit: 'cover', display: 'block' },
    galleryOverlay: {
        position: 'absolute', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        transition: 'opacity 0.3s',
    },
    featuresSection: { backgroundColor: '#111827', padding: '4rem 2rem' },
    featuresContainer: { maxWidth: '800px', margin: '0 auto', textAlign: 'center' },
    featuresTitle: { fontSize: '2rem', marginBottom: '1.5rem' },
    videoRow: { display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' },
    videoItem: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#10B981' },
    videoDesc: { flex: '0 0 200px', textAlign: 'left', fontSize: '1.1rem' },
    videoEmbed: { width: '100%', maxWidth: '560px', height: '315px', border: 'none' },
    featuresList: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', listStyle: 'none', padding: 0 },
    featureItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' },
    footer: { textAlign: 'center', padding: '2rem 0', color: '#9CA3AF', backgroundColor: '#1F2937' },
};

export default function DetroitCommercial() {
    const audioRef = useRef(null);
    const featuresRef = useRef(null);
    const galleryRef = useRef(null);
    const contactRef = useRef(null);

    // Attempt to play background audio on mount
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().catch(() => {
                console.warn('Autoplay blocked - will play on user interaction');
            });
            // Fallback: resume on first click
            const resumeAudio = () => {
                audio.play();
                window.removeEventListener('click', resumeAudio);
            };
            window.addEventListener('click', resumeAudio);
        }
    }, []);

    const navItems = [
        { label: 'Features', onClick: () => featuresRef.current.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Gallery', onClick: () => galleryRef.current.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Contact', onClick: () => contactRef.current.scrollIntoView({ behavior: 'smooth' }) },
    ];

    const images = [
        { src: "/images/truck.jpg", alt: "Rivian Truck", desc: "R1T: Ultimate Electric Truck" },
        { src: "/images/suv.jpg", alt: "R1S SUV", desc: "R1S: Adventure Meets Luxury" },
        { src: "/images/interior.jpg", alt: "Rivian Interior", desc: "Spacious Interior, Cutting-Edge Tech" }
    ];

    const featureVideos = [
        { title: 'Vidéo Night Promo', embedId: 'HMH3IJ16E0M' },
        { title: 'Tank Turn', embedId: 'yzwM8KE2L3I' },
        { title: 'Performance Testing Launch', embedId: '0Tu7oLGVCoI' }
    ];

    return (
        <div style={styles.container}>
            <audio ref={audioRef} style={styles.audio} autoPlay loop>
                <source src="/audio/cinemati.mp3" type="audio/mpeg" />
            </audio>

            <motion.nav style={styles.nav} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
                <div style={styles.navInner}>
                    <h1 style={styles.navTitle}>Rivian</h1>
                    <ul style={styles.navList}>
                        {navItems.map(item => (
                            <li
                                key={item.label}
                                style={styles.navItem}
                                onMouseEnter={e => e.currentTarget.style.color = styles.navItemHover.color}
                                onMouseLeave={e => e.currentTarget.style.color = styles.navItem.color}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.nav>

            <motion.section style={styles.hero} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <video style={styles.video} src="/video/RivianPromote.mp4" autoPlay muted loop playsInline />
                <div style={styles.heroOverlay} />
                <div style={styles.heroTextContainer}>
                    <motion.h2 style={styles.heroTitle} initial={{ y: 50, opacity: 0 }} animate={{ y: 0,Opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                        Discover Your Next Adventure
                    </motion.h2>
                    <motion.button style={styles.heroButton} whileHover={{ scale: 1.05 }} onClick={() => window.open('https://rivian.com', '_blank')}>
                        Learn More
                    </motion.button>
                </div>
            </motion.section>

            <section ref={galleryRef} style={styles.gallerySection}>
                <h3 style={styles.galleryTitle}>Models Gallery</h3>
                <div style={styles.galleryGrid}>
                    {images.map((img, idx) => (
                        <div key={idx} style={styles.galleryItem}>
                            <img src={img.src} alt={img.alt} style={styles.galleryImage} />
                            <div style={styles.galleryOverlay} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                <p>{img.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <motion.section ref={featuresRef} style={styles.featuresSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.featuresTitle}>Feature Videos</h2>
                    <div style={styles.videoRow}>
                        {featureVideos.map(({ title, embedId }, i) => (
                            <div key={i} style={styles.videoItem}>
                                <div style={styles.videoDesc}>{title}</div>
                                <iframe
                                    style={styles.videoEmbed}
                                    src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`}
                                    title={title}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        ))}
                    </div>
                    <h2 style={styles.featuresTitle}>Why Choose Rivian?</h2>
                    <ul style={styles.featuresList}>
                        {[
                            { icon: '✔️', text: 'Top-tier quality in every component' },
                            { icon: '🚀', text: 'Trend-setting design that turns heads' },
                            { icon: '⚡', text: 'Zero emissions with our electric powertrain' },
                            { icon: '🏭', text: 'Proudly built in Detroit, the innovation hub' }
                        ].map((feat, i) => (
                            <li key={i} style={styles.featureItem}>
                                <span>{feat.icon}</span>
                                <span>{feat.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            <footer ref={contactRef} style={styles.footer}>
                &copy; {new Date().getFullYear()} Rivian – All rights reserved<br />
                <a href="mailto:contact@rivian.com" style={{ color: '#10B981', textDecoration: 'none' }}>Contact Us</a>
            </footer>
        </div>
    );
}
