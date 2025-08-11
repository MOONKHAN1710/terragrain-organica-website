import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "#0A0A0A" } },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#222222" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 2, random: true },
          links: { enable: true, distance: 150, color: "#222222", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 1, direction: "none", out_mode: "out" },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: { repulse: { distance: 100 } },
        },
        detectRetina: true,
      }}
    />
  );
};
export default ParticlesBackground;