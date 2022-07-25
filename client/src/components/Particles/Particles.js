import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useCallback, useMemo } from 'react';

const ParticlesComponent = ({ id }) => {
  const options = useMemo(() => {
    return {
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          repulse: {
            distance: 300,
          },
        },
      },
      particles: {
        links: {
          enable: true,
          distance: 50,
        },
        move: {
          enable: true,
          speed: { min: 1, max: 3 },
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return <Particles id={id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;
