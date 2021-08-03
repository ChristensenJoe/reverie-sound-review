import {useHistory} from "react-router-dom";
import NavBar from "./NavBar";

function News({user}) {
    const history = useHistory();

    if(!user) {
        history.push("/");
    }

    return (
        <div>
            <NavBar />

        </div>
    );
}

export default News;