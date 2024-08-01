import { useState, useEffect } from "react";
import "./styles/loading.css";

const Loading = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(intervalId);
          setLoading(false); // Ensure setLoading(false) is called only once progress reaches 100
          return 100;
        }
      });
    }, 20); // Update progress every 20ms

    return () => clearInterval(intervalId);
  }, [setLoading]);

  return (
    <div className="loading-container">
      <div className="loading-bar">
        <div
          className="loading-progress"
          style={{
            width: `${progress}%`,
            backgroundColor: `rgba(76, 175, 80, ${progress / 100})`, // Green color with opacity
          }}
        />
      </div>
      <h3>Loading...</h3>
    </div>
  );
};

export default Loading;
