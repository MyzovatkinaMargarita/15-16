import { Outlet, NavLink } from "react-router-dom";
export default function AppLayout() {
  return (
    <>
      <header style={{ padding: "12px 20px", borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 20 }}>
          <NavLink to="/login" end className={({ isActive }) => (isActive ? "active" : undefined)}>Login</NavLink>
          <NavLink to="/student" className={({ isActive }) => (isActive ? "active" : undefined)}>Student</NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : undefined)}>Admin</NavLink>
        </nav>
      </header>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </>
  );
}
