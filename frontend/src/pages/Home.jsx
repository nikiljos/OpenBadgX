import { Link } from "react-router-dom";

const Home = () => {
  return <div>
    <h1>Welcome to OpenBadgX</h1>
    <Link to="/login">Login</Link>
  </div>;
};

export default Home
