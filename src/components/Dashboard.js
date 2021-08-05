import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/w3.css"

function Dashboard({ user }) {
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    return (

        <div
            style={{
                background: "url('https://cdn.pixabay.com/photo/2020/05/11/09/03/conductor-5157153_1280.jpg')",
                minHeight: "100%",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
        }}>

            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    width: "100%",
                    textAlign: "center",
                    color: "#ff5722"
            }}>
                
                <span
                    style={{
                        backgroundColor: "black",
                        color: "#ff5722",
                        padding: "18px",
                        fontSize: "25px",
                        letterSpacing: "10px"
                }}>
                    HELLO {(typeof user === "object") && user.username.toUpperCase()}
                </span>

            </div>

            <NavBar user={user} />

            <div
                style={{
                    color: "#ff5722",
                    marginTop: "50%",
                    height: "10%",
                    backgroundColor: "black",
                    textAlign: "justify",
                    padding: "50px 80px"
            }}>
                <h3 style={{ textAlign: "center" }}>Reverie Sound Review</h3>
                <p style={{ textAlign: "center" }}>Reviews // Articles // Forum</p>
            </div>

            <div
                style={{
                    position: "relative",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2017/02/25/22/05/orchestra-2098877_1280.jpg')",
                    minHeight: "500px"
            }}>
            </div>

            <div
                style={{
                    color: "#ff5722",
                    marginTop: "0%",
                    height: "10%",
                    backgroundColor: "black",
                    textAlign: "justify",
                    padding: "50px 80px"
            }}>
                <h3 style={{ textAlign: "center" }}>Created by Joe Christensen and Trevor Zylks</h3>
                <p style={{ textAlign: "center" }}>Flatiron Software Engineering '21</p>
            </div>

            <div
                style={{
                    position: "relative",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2020/04/08/19/10/violin-5018625_1280.jpg')",
                    minHeight: "600px"
                }}>
            </div>

            <div
                style={{
                    color: "#ff5722",
                    marginTop: "0%",
                    height: "5%",
                    backgroundColor: "black",
                    textAlign: "justify",
                    padding: "50px 80px"
            }}>
                <p style={{ textAlign: "center" }}>Joe Christensen Github: </p>
                <p style={{ textAlign: "center" }}>Trevor Zylks Github: </p>
            </div>

        </div>
    );
}

export default Dashboard;