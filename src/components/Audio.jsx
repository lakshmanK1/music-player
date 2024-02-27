import React from "react";
import WaveSurfer from "wavesurfer.js";

const Audio = () => {
  const inputFile = React.useRef(null);
  const waveFormRef = React.useRef(null);
  const [file, setFile] = React.useState(null);
  const [seconds, setSeconds] = React.useState(0);

  let waveSurfer;

  const handleButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleAudioPlay = () => {
    waveSurfer.play();
  };

  React.useEffect(() => {
    if (file) {
      waveSurfer = WaveSurfer.create({
        container: waveFormRef.current,
      });
      waveSurfer.load(file);
      waveSurfer.on("timeupdate", (currenttime) => {
        setSeconds(Math.round(currenttime));
      });
    }
  }, [file]);

  return (
    <main>
      <div className="upload-audio">
        <i className="audio-icon">
          music player
        </i>
        <h1>Upload your audio file here</h1>
        <button className="upload-btn" onClick={handleButtonClick}>
          Upload
        </button>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          accept="audio/*"
          onChange={handleFileUpload}
        />
      </div>
      {file && (
        <section>
          <div
            id="audiowaveform"
            ref={waveFormRef}
            style={{ width: "100%" }}
          ></div>
          <div>
            <p style={{color:'white'}}>{`${seconds} seconds`}</p>
          </div>
          <button id="play-button" onClick={handleAudioPlay}>
            Play
          </button>
        </section>
      )}
    </main>
  );
};

export default Audio;
