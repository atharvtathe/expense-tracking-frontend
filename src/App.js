import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { useContext } from "react";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import AuthContext from './components/auth-context'
import Report from "./components/Report";
import Homenotlogin from "./components/Homenotlogin";
import ResetP from "./components/ResetP";

function App() {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;
	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/">
						{isLoggedIn && <Home />}
						{!isLoggedIn && <Homenotlogin />}
					</Route>
					{isLoggedIn && <Route exact path="/reports">
						<Report />
					</Route>}
					{!isLoggedIn && <Route exact path="/login">
						<Login />
					</Route>}
					{!isLoggedIn && <Route exact path="/signup">
						<Signup />
					</Route>}
					<Route exact path="/resetpassword">
						<ResetP />
					</Route>
					<Route path="*">
						<h1 className="text-5xl mt-32 mx-auto pt-5 text-center">404</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
