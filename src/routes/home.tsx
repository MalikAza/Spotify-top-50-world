import '../css/home.css';
import TrackList from '../components/trackList';
import React, { useEffect, useRef, useState } from 'react';
import SpotifyFetchedAlbumModel from '../models/spotifyFetchedAlbumModel';

function Home() {
  const [albumData, setAlbumData] = useState<SpotifyFetchedAlbumModel>()
  const [search, setSearch] = useState('')
  const headerRef = useRef(null)

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleSearchSubmit(event: React.FormEvent) {
    event.preventDefault()
    // search func
  }

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
        <div></div>
        <h1>{albumData?.name}</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder='Search another album'
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <TrackList
        setAlbumData={setAlbumData}
      />
    </div>
  )
}

export default Home;
