import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    console.log("User logged in:", decoded);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import jwtDecode from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false); // ← new
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const login = async (token) => {
//     setLoading(true); // ← show loader
//     localStorage.setItem("token", token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//     navigate("/");
//     setLoading(false); // ← hide loader
//   };

//   const logout = () => {
//     setLoading(true); // ← optional, if you want loader
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//     setLoading(false); // ← optional
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
