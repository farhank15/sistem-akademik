import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

const Appshell = ({ children }) => {
  return (
    <Router>
      <div className="font-poppins">
        <HelmetProvider>{children}</HelmetProvider>
      </div>
    </Router>
  );
};

export default Appshell;
