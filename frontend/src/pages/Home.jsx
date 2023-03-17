import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
  return (
    <div>
      <h1>Welcome to OpenBadgX</h1>
      <h3>The future of awarding!</h3>
      {/* <div className="links">
        <div>
          <Link to="/login">Login/Logout</Link>
        </div>
        <div>
          <Link to="/org">Select Org</Link>
        </div>
        <div>
          <Link to="/org/home">Org Home</Link>
        </div>
        <div>
          <Link to="/me/badge">Recieved Badges</Link>
        </div>
      </div> */}
    </div>
  );
};

export default Home
