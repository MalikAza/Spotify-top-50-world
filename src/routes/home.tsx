import '../css/home.css';
import TrackList from '../components/trackList';
import { useEffect, useRef, useState } from 'react';
import SpotifyFetchedAlbumModel from '../models/spotifyFetchedAlbumModel';

function Home() {
  const [albumData, setAlbumData] = useState<SpotifyFetchedAlbumModel>()
  const headerRef = useRef(null)

  useEffect(() => {
    if (headerRef.current) {
      const headerElement = (headerRef.current as HTMLElement);
      const headerStyle = window.getComputedStyle(headerElement)
      const headerMargins = parseFloat(headerStyle.marginTop) + parseFloat(headerStyle.marginBottom)
      const headerHeight = headerElement.offsetHeight + headerMargins

      const trackContainer = document.querySelector('.track-container') as HTMLElement;
      if (trackContainer) {
        trackContainer.style.paddingTop = `${headerHeight+10}px`
      }
    }
  });

  return (
    <div className='home'>
      <header ref={headerRef}>
        <h1>{albumData?.name}</h1>
      </header>
      <TrackList
        setAlbumData={setAlbumData}
      />
    </div>
  )
}

export default Home;
