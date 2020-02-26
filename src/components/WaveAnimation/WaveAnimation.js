import React from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const WaveAnimation = ({
  strokeColour = '#0fa6d1',
  amplitude = 80,
  transform = 'none',
  onMouseDown,
  onMouseUp,
}) => {
  React.useEffect(() => {
    // TweenLite.defaultEase = Sine.easeInOut;
    // TweenLite.set('g', { y: window.innerHeight / 2 });

    var svg = document.querySelector('svg');
    var wave = document.querySelector('#wave');

    var width = 600;
    var sinus = CustomEase.create(
      'sinus',
      'M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0'
    );

    // var amplitude = 80;
    var frequency = 50;
    var segments = 1000;
    var interval = width / segments;

    for (var i = 0; i <= segments; i++) {
      var norm = 1 - i / segments;
      var point = wave.points.appendItem(svg.createSVGPoint());

      point.x = i * interval;
      point.y = (amplitude / 2) * sinus(norm);

      gsap
        .to(point, {
          duration: 0.3,
          y: -point.y,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        .progress(norm * frequency);
    }
  }, [amplitude]);
  return (
    <svg
      className="wave-animation"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        cursor: 'pointer',
        transform,
      }}
    >
      <g style={{ transform: 'translate(0, 50%)' }}>
        <line id="line" x1="0" x2="100%"></line>
        <polyline id="wave"></polyline>
      </g>

      <style>
        {`
          // #line {
          //   stroke-width: 1;
          //   stroke: red;
          // }

          .wave-animation {
            width: 600px;
            height: 100%;
            // padding: 50px;
            transition: 0.2s;
          }

          #wave {
            fill: none;
            stroke-width: 1;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: ${strokeColour};
          }
        `}
      </style>
    </svg>
  );
};

export default WaveAnimation;
