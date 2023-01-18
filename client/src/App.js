import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import OfferTable from "./components/molekul/OfferTable";
import OrderTable from "./components/molekul/OrderTable";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

// component
import Auth from "./pages/Auth";
import Detail from "./pages/Detail";
import DetailUser from "./pages/DetailUser";
import EditProfile from "./pages/EditProfile";
import Hired from "./pages/Hired";
import Home from "./pages/Home";
import PrivateRoot from "./pages/PrivateRoot";
import Profile from "./pages/Profile";
import SeeProject from "./pages/SeeProject";
import SendProject from "./pages/SendProject";
import Transaction from "./pages/Transaction";
import UploadPost from "./pages/UploadPost";

function App() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    useEffect(() => {
        if (state.isLogin === false) {
            navigate("/auth");
        } else {
            navigate("/");
        }
    }, [state]);

    const checkUser = async () => {
        try {
            const response = await API.get("/check-auth");

            if (response.status === 404) {
                return dispatch({
                    type: "AUTH_ERROR",
                });
            }

            let payload = response.data.data;
            payload.token = localStorage.token;

            dispatch({
                type: "USER_SUCCESS",
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.token) {
            checkUser();
        }
    }, []);

    return (
        <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route element={<PrivateRoot />}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/detail/:id" element={<Detail />} />
                <Route exact path="/upload-post" element={<UploadPost />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route
                    exact
                    path="/edit-profile/:id"
                    element={<EditProfile />}
                />
                <Route exact path="/detail-user/:id" element={<DetailUser />} />
                <Route exact path="/transaction/:id" element={<Transaction />}>
                    <Route path="order" element={<OrderTable />} />
                    <Route path="offer/" element={<OfferTable />} />
                </Route>
                <Route exact path="/hired/:id" element={<Hired />} />
                <Route
                    exact
                    path="/send-project/:id"
                    element={<SendProject />}
                />
                <Route exact path="/see-project/:id" element={<SeeProject />} />
            </Route>
        </Routes>
    );
}

export default App;
