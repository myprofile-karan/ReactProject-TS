import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    async function fun(): Promise<void> {
      const isLoggedIn: boolean = JSON.parse(
        localStorage.getItem("login") || "false"
      );

      if (!isLoggedIn) {
        await navigate("/login");
        alert("please Login first!");
      }
    }
    fun();
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
