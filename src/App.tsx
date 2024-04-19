import { useEffect, useRef } from 'react';
import './App.css';
import TrackList from './components/trackList';

function App() {
  const titleRef = useRef(null)

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = (titleRef.current as HTMLElement);
      const titleStyle = window.getComputedStyle(titleElement)
      const titleMargins = parseFloat(titleStyle.marginTop) + parseFloat(titleStyle.marginBottom)
      const titleHeight = titleElement.offsetHeight + titleMargins

      const trackContainer = document.querySelector('.track-container') as HTMLElement;
      if (trackContainer) {
        trackContainer.style.paddingTop = `${titleHeight}px`
      }
    }
  });

  return (
    <div className='App'>
      <h1 ref={titleRef}>Top 50 World</h1>
      <TrackList />
    </div>
  )
}

export default App;
