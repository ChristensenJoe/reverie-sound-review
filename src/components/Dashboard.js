import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";

function Dashboard({ user }) {
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    return (
        <div style={{
            background: "url('https://cdn.pixabay.com/photo/2020/05/11/09/03/conductor-5157153_1280.jpg')",
            minHeight: "100%",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div style={{position: "absolute",
                left: "0",
                top: "50%",
                width: "100%",
                textAlign: "center",
                color: "#fe7f2d"}}>
                        <span style={{backgroundColor: "#111",
                        color: "#fe7f2d",
                        padding: "18px",
                        fontSize: "25px",
                        letterSpacing: "10px"}}>
                        SCROLL DOWN</span>
            </div>

            <NavBar />

            <div style={{color: "#777",
                marginTop: "70%",
                height: "10%",
                backgroundColor:"white",
                textAlign:"center",
                padding:"50px 80px",
                textAlign: "justify"}}>
                <h3 style={{textAlign:"center"}}>Hello {user}</h3>
                <p style={{textAlign:"center"}}>Reviews // Articles // Forum</p>
            </div>

            <div style={{
                 position: "relative",
                 opacity: "0.65",
                 backgroundAttachment: "fixed",
                 backgroundPosition: "center",
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
                 backgroundImage: "url('https://cdn.pixabay.com/photo/2017/02/25/22/05/orchestra-2098877_1280.jpg')",
                 minHeight: "400px"

            }}></div>

        </div>
    );
}

export default Dashboard;