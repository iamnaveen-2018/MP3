import { useRef, useState } from "react";
import './App.css';
import axios from "axios";
import {youtube_parser} from "./utils";


function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    
    axios( {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': '2a01d81135msh0722fc5c37c1b79p172703jsn13dfc115053d',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id:youtubeID
      } 
    })
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';
  }
  return (
    <div className="app">
      <span className="logo">YT3Converter</span>
      <section className="content">
        <h1 className="content_title">YT <span id="test">MP3</span> Converter For <span id="test">Free</span></h1>
        <p className="content_description">Convert YouTube Mp4 Video to Mp3 in a click..!</p>
        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Please enter the Youtube video URL here..." type="url" className="form_input" />
          <button className="form_button">Search</button>
        </form>
        {urlResult ? <a  rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a>: ''}
        
      </section>
    </div>
  );
}

export default App;
