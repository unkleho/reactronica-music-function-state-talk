import React from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const WaveAnimation = () => {
  React.useEffect(() => {
    // TweenLite.defaultEase = Sine.easeInOut;
    // TweenLite.set('g', { y: window.innerHeight / 2 });

    var svg = document.querySelector('svg');
    var wave = document.querySelector('#wave');

    var width = 800;
    var sinus = CustomEase.create(
      'sinus',
      'M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0'
    );

    var amplitude = 200;
    var frequency = 60;
    var segments = 1000;
    var interval = width / segments;

    for (var i = 0; i <= segments; i++) {
      var norm = 1 - i / segments;
      var point = wave.points.appendItem(svg.createSVGPoint());

      point.x = i * interval;
      point.y = (amplitude / 2) * sinus(norm);

      gsap
        .to(point, { duration: 0.3, y: -point.y, repeat: -1, yoyo: true })
        .progress(norm * frequency);
    }
  }, []);
  return (
    <svg>
      <g>
        <line id="line" x1="0" x2="100%"></line>
        <polyline id="wave"></polyline>
      </g>

      <style jsx>
        {`
          // #line {
          //   stroke-width: 1;
          //   stroke: red;
          // }

          svg {
            width: 600px;
            width: 800px;
            height: 100%;
            padding: 50px;
          }

          #wave {
            fill: none;
            stroke-width: 4;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: #56acf4;
          }
        `}
      </style>
    </svg>
  );
};

export default WaveAnimation;
