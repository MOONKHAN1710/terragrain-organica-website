import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import TerminalText from '../components/TerminalText';
import ParticlesBackground from '../components/ParticlesBackground';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const canvasRef = useRef(null);
  const animationContainerRef = useRef(null);

  useEffect(() => {
    // --- CONFIGURATION ---
    const FRAME_COUNT = 2455; // Your total frame count
    const currentFrame = index => (
      `/assets/sequence/${index.toString().padStart(5, '0')}.png`
    );
    // --- END CONFIGURATION ---

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    
    canvas.width = 1920;
    canvas.height = 1080;

    const images = [];
    const frame = { current: 0 };
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[Math.round(frame.current)];
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const center_x = (canvas.width - img.width * ratio) / 2;
        const center_y = (canvas.height - img.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height, center_x, center_y, img.width * ratio, img.height * ratio);
      }
    };
    
    images[0].onload = render;

    // The main GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: animationContainerRef.current,
        start: "top top",
        end: "+=4000", // This sets the scroll distance for the animation
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to(frame, {
      current: FRAME_COUNT - 1,
      snap: "current",
      ease: "none",
      onUpdate: render
    });
    
    // Animate text panels to fade in and out
    gsap.utils.toArray('.story-panel').forEach((panel, i) => {
        gsap.fromTo(panel, {opacity: 0}, {
            opacity: 1,
            scrollTrigger: {
                trigger: panel,
                start: 'top center',
                end: 'center center',
                scrub: true,
            }
        });
        gsap.to(panel, {
            opacity: 0,
            scrollTrigger: {
                trigger: panel,
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        });
    });


    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  }, []);

  return (
    <PageWrapper>
      <ParticlesBackground />
      <div className="content-container">
        
        <section id="hero" className="h-screen w-full flex items-center justify-center relative">
          <div className="w-full max-w-4xl px-4">
            <TerminalText
              lines={[
                "Booting Terragrain OS...",
                "Verifying organic supply chain...",
                "System ready. Welcome."
              ]}
            />
          </div>
        </section>

        <div ref={animationContainerRef} className="animation-container h-screen relative">
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
          <div className="scroll-content">
              <div className="story-panel">
                  <div className="story-content">
                      <h2>A Story Milled with Passion</h2>
                      <p>Terragrain Organica is a woman-owned agro-processing brand from the heart of Assam.</p>
                  </div>
              </div>
              <div className="story-panel">
                  <div className="story-content">
                      <h2>Our Commitment to Quality</h2>
                      <p>We believe in transparency and quality, from the golden wheat fields to your family's table.</p>
                  </div>
              </div>
          </div>
        </div>

        <section id="contact" className="py-24 text-center">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-lg text-brand-secondary">Abu Sufian Al Faruk Khan</p>
            <p className="text-lg text-brand-secondary">+91 9957421713 | moonkhan1T10@gmail.com</p>
        </section>

        <footer className="text-center py-8 border-t border-brand-border">
            <p className="text-brand-secondary">&copy; 2025 Terragrain Organica. All Rights Reserved.</p>
        </footer>

      </div>
    </PageWrapper>
  );
};

export default Home;