import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayouts({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
