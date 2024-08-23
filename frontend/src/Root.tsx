import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes";

function Root() {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
    </>
  );
}

export default Root;
