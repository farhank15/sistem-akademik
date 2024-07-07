import { useEffect, useState } from "react";
import Joyride from "react-joyride";

const Tour = ({ steps }) => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const handleDoubleClick = () => {
      setRunTour(true);
    };

    window.addEventListener("dblclick", handleDoubleClick);

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#fff",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#b91c1c",
          textColor: "#333",
          width: "300px",
          zIndex: 1000,
        },
        buttonNext: {
          backgroundColor: "#f87171",
          color: "#fff",
          fontSize: "14px",
        },
        buttonBack: {
          color: "#000",
          fontSize: "14px",
        },
        buttonSkip: {
          color: "#000",
          fontSize: "14px",
        },
        tooltip: {
          borderRadius: "8px",
          padding: "10px",
          fontSize: "14px",
        },
      }}
      callback={(data) => {
        const { status } = data;
        if (status === "finished" || status === "skipped") {
          setRunTour(false);
        }
      }}
    />
  );
};

export default Tour;
