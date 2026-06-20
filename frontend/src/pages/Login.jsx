import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }


    try {

      const result = await login(
        email.trim(),
        password
      );


      if (result?.success) {

        if (remember) {
          localStorage.setItem(
            "savedEmail",
            email
          );
        } else {
          localStorage.removeItem(
            "savedEmail"
          );
        }


        alert("Đăng nhập thành công!");

        navigate("/products");

      } else {

        setError(
          result?.message ||
          "Sai email hoặc mật khẩu!"
        );

      }

    } catch (err) {

      setError(
        "Không kết nối được server!"
      );

    }

  };


  return (
    <div style={styles.page}>

      <div style={styles.box}>

        <h1 style={styles.title}>
          Đăng Nhập
        </h1>


        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}


        <form onSubmit={handleLogin}>


         <input
          id="email"
          type="email"
        />

        <input
          id="password"
          type="password"
        />

        <button
          id="loginBtn"
          type="submit"
        >
          Đăng nhập
        </button>


          <label>

            <input
              type="checkbox"
              checked={remember}
              onChange={(e)=>setRemember(e.target.checked)}
            />

            {" "}Lưu email

          </label>


          <button
            type="submit"
            style={styles.btn}
            disabled={isLoading}
          >

            {
              isLoading
              ? "Đang xử lý..."
              : "Đăng nhập"
            }

          </button>


        </form>


      </div>

    </div>
  );
}



const styles={

page:{
backgroundColor:"#b5ebff",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
},


box:{
backgroundColor:"#fff",
padding:40,
borderRadius:15,
width:400,
boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
},


title:{
textAlign:"center",
color:"#0099cc",
marginBottom:30
},


input:{
width:"100%",
padding:12,
marginBottom:15,
borderRadius:8,
border:"1px solid #ccc",
boxSizing:"border-box"
},


btn:{
width:"100%",
padding:12,
backgroundColor:"#0099cc",
color:"#fff",
border:"none",
borderRadius:8,
cursor:"pointer",
fontSize:16
},


error:{
background:"#ffebee",
color:"#c62828",
padding:10,
borderRadius:6,
marginBottom:15
}

};