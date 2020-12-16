import React, { useState, useEffect } from "react";
import "./nasaPic.css";

function NasaPic() {
  const [url, setUrl] = useState("");
  const [copyright, setCopyright] = useState("");
  const [date, setDate] = useState("");
  const [explanation, setExplanation] = useState("");
  const [hdurl, setHdurl] = useState("");

  async function nasaImageApi() {
    let result = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=5hGXtiNISMXZjSMf7hvUqv1v67bFuqlJKoYVn6PX`
    );
    let data = await result.json();

    setUrl(data.url);
    console.log(data.url);

    setCopyright(data.copyright);
    setDate(data.date);
    setExplanation(data.explanation);
    setHdurl(data.hdurl);
  }

  useEffect(() => {
    setInterval(nasaImageApi, 8.64e7); //8.64e7
    // return () => clearInterval(imageInterval);
  }, []);

  //   useEffect(() => {
  //     const timeInterval = setInterval(makeTime, 1000);
  //     return () => clearInterval(timeInterval); //change page, time will stop
  //   }, []);

  return (
    <div className="container">
      <div className="sideBox nasaPicSec">
        {explanation}
        <img src={url} alt="Nasa picture of the day" className="nasaImgSmall" />
      </div>
    </div>
  );
}

export default NasaPic;
