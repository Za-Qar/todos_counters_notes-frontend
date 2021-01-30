import React, { useState, useEffect } from "react";
import "./nasaPic.css";

function NasaPic() {
  const [url, setUrl] = useState("");
  const [copyright, setCopyright] = useState("");
  const [date, setDate] = useState("");
  const [explanation, setExplanation] = useState("");
  const [hdurl, setHdurl] = useState("");

  const [flexHide, setFlexHide] = useState("flexHide");

  async function nasaImageApi() {
    let result = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
    let data = await result.json();

    setUrl(data.url);

    setCopyright(data.copyright);
    setDate(data.date);
    setExplanation(data.explanation);
    setHdurl(data.hdurl);
  }

  useEffect(() => {
    setInterval(nasaImageApi(), 8.64e7); //8.64e7
    // return () => clearInterval(imageInterval);
  }, []);

  function hideExpandedImage() {
    setFlexHide("flexHide");
  }

  function expandedImage() {
    // setFlexHide("");
    flexHide ? setFlexHide("") : setFlexHide("flexHide");
  }

  return (
    <div>
      <div className="container">
        <div className="sideBox nasaPicSec">
          <p>Nasa Image of the day</p>
          <div className="nasaImageSmallContainer">
            <img
              src={url}
              alt="Nasa pic of the day"
              className="nasaImgSmall"
              onClick={expandedImage}
            />
          </div>
        </div>
      </div>

      <div className={`alignerNasa ${flexHide}`} onClick={hideExpandedImage}>
        <div className="nasaExplanation">
          <p>{date}</p>
        </div>

        <div className="nasaExplanation">
          <p>{copyright}</p>
        </div>

        <div className="aligneeNasa">
          <div className="nasaImageClose">
            <p onClick={hideExpandedImage}>x</p>
          </div>

          <img src={hdurl} alt="Nasa pic of the day" className="nasaImgBig" />
        </div>

        <div className="nasaExplanation">
          <p>{explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default NasaPic;
