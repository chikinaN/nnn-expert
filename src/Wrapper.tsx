import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import App from './App';

function Wrapper() {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      const aspectRatio = 16 / 9;
      let width = window.innerWidth;
      let height = window.innerHeight;
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
      setDimensions({ width, height });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = css`
    width: ${dimensions.width}px;
    height: ${dimensions.height}px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  `;

  return (
    <div css={style}>
      <App />
    </div>
  )
}

export default Wrapper
