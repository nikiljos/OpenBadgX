import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to OpenBadgX</h1>
      <Link to="/login">Login</Link><br />
      <Link to="/org">Select Org</Link><br />
      <Link to="/org/home">Org Home</Link>
    </div>
  );
};

export default Home
