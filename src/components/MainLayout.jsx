import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <nav className="layout navbar bg-base-100">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Home
        </Link>
        <Link to="/cart" className="btn btn-ghost normal-case text-xl">
          Cart
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
