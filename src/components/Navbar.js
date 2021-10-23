import React, { useState, useContext } from 'react'
import {
	Link, useHistory
} from "react-router-dom";
import AuthContext from './auth-context'



const Navbar = () => {

	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;
	const history = useHistory();

	const [ishamopen, Sethamopen] = useState(false);

	const hamopener = () => {
		if (ishamopen) {
			Sethamopen(false);
		}
		else {
			Sethamopen(true);
		}
	}

	const logouthandler = () => {
		authCtx.logout();
		history.replace('/')
	}

	const logoutmobile = () => {
		Sethamopen(false);
		logouthandler();
	}

	return (
		<div className="fixed top-0 w-full z-30 ">

			<nav className="relative w-full bg-white border-b px-4 lg:px-28 py-4 flex flex-row justify-between items-center ">
				<div>
					<Link to="/">

						<div className="flex flex-row items-center ">
							<div className="w-10 h-10">
								<img src="/expenses.png" alt="logo" width={40} height={40} className="object-contain" />
							</div>
							<div className="font-extrabold sm:text-3xl text-2xl text-indigo-900">
								Expenso
							</div>
						</div>

					</Link>
				</div>
				<ul className="flex flex-row space-x-4 items-center list-none pl-0 mx-0">
					{isLoggedIn && <li className="hidden md:block ">
						<Link to="/reports">

							<span className="font-medium  rounded font-sans text-sm text-gray-600 py-1 px-2 hover:bg-gray-100">Reports</span>

						</Link>
					</li>}

					{!isLoggedIn && <li className="hidden md:block ">
						<Link to="/login">

							<span className="font-medium  rounded font-sans text-sm text-gray-600 py-1 px-2 hover:bg-gray-100">Login</span>

						</Link>
					</li>}

					{!isLoggedIn && <li className="hidden md:block ">
						<Link to="/signup">

							<span className="block bg-indigo-900 text-white px-2 sm:px-7 py-2 text-xs sm:text-sm rounded font-medium hover:bg-indigo-800">Sign Up</span>

						</Link>
					</li>}
					{isLoggedIn && <li className="hidden md:block ">
						<span className="font-medium  rounded font-sans text-sm text-gray-600 py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={logouthandler}>Logout</span>
					</li>}
					{/* desktop nav end and mobile starts */}

					<li className="block md:hidden ">
						<span className="font-extrabold  rounded font-sans text-sm text-gray-600 py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={hamopener}>{ishamopen ? (<span className="text-xs">✖️</span>) : (<span>☰</span>)}</span>
					</li>
				</ul>


				{ishamopen && <ul className="flex flex-col list-none w-64 mx-0 md:hidden absolute top-16 right-0 border px-1 py-1  z-30 bg-white rounded shadow-lg">
					{isLoggedIn && <li className="">
						<Link to="/reports">

							<span className="block  px-2 sm:px-7 py-2 text-xs sm:text-sm rounded font-medium hover:bg-gray-100" onClick={() => Sethamopen(false)}>Reports</span>

						</Link>
					</li>}

					{!isLoggedIn && <li className="">
						<Link to="/login">

							<span className="block  px-2 sm:px-7 py-2 text-xs sm:text-sm rounded font-medium hover:bg-gray-100" onClick={() => Sethamopen(false)}>Login</span>

						</Link>
					</li>}
					{isLoggedIn && <li className="block md:hidden">
						<span className="block cursor-pointer px-2 sm:px-7 py-2 text-xs sm:text-sm rounded font-medium hover:bg-gray-100" onClick={() => logoutmobile()}>Logout</span>
					</li>}

					{!isLoggedIn && <li className=" ">
						<Link to="/signup">

							<span className="block bg-indigo-900 text-white px-2 sm:px-7 py-2 text-xs sm:text-sm rounded font-medium hover:bg-indigo-800" onClick={() => Sethamopen(false)}>Sign Up</span>

						</Link>
					</li>}

				</ul>}

			</nav>
		</div>
	)
}

export default Navbar