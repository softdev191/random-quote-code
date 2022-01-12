import { useEffect, useRef, useState } from 'react';
import { createApi } from 'unsplash-js';

import logo from './logo.svg';
import './App.css';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_KEY
});

function App() {
  const [quote, setQuote] = useState(null);
  const [bgImage, setBgImage] = useState(null);

  const quoteContainerRef = useRef();

  useEffect(() => {
    const getQuote = () => {
      fetch("https://api.quotable.io/random")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setQuote(data);
      });

      unsplash.photos.getRandom({ topicIds: ['bo8jQKTaE0Y'] }).then(res => {
        setBgImage(res.response?.urls);
      });
    }

    getQuote();
    const interval = setInterval(() => getQuote(), 15000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (quote) {
      quoteContainerRef.current.animate(
        {
          opacity: [0, 1]
        },
        500
      )
    }
  }, [quote]);

  return (
    <div className="App">
      {bgImage && (
        <img className="bg-image" src={bgImage.raw} alt="background" />
      )}
      <header className="App-header">
        {quote && (
          <div className="quote-container" ref={quoteContainerRef}>
            <p className="quote-content">"{quote.content}"</p>
            <p className="quote-author">{quote.author}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
