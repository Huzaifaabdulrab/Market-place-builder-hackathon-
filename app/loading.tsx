'use client'
import { useEffect } from 'react';
import anime from 'animejs';

const Loader = () => {
  useEffect(() => {
    // Anime.js animation
    anime({
      targets: '.loader',
      keyframes: [
        { translateY: -40, easing: 'easeOutExpo' },
        { translateX: 250, easing: 'easeOutExpo' },
        { translateY: 40, easing: 'easeOutExpo' },
        { translateX: 0, easing: 'easeOutExpo' },
        { translateY: 0, easing: 'easeOutExpo' }
      ],
      duration: 4000,
      easing: 'easeOutElastic(1, .8)',
      loop: true
    });
  }, []);
  
  useEffect(() => {
    anime.timeline({ loop: true })
      .add({
        targets: '.morent-text .letter',
        translateY: [-50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 600,
        delay: (el, i) => 100 * i,
      })
      .add({
        targets: '.morent-text .letter',
        translateY: [0, 50],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 600,
        delay: (el, i) => 100 * i,
      });
  }, []);

  return (
    <div className="morent-loader fixed inset-0 flex justify-center items-center z-30">
      <div className="text-center">
        <h1 className="morent-text text-6xl font-bold text-blue-600 mb-6">
          {"MORENT".split("").map((letter, index) => (
            <span key={index} className="letter inline-block">
              {letter}
            </span>
          ))}
        </h1>
        <div className="loader w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default Loader;
