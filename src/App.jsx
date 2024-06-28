import Appshell from "@components/molecules/Appshell";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Appshell>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Appshell>
  );
}

export default App;
