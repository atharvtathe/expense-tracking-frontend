import React from 'react'
import { useState, useContext } from 'react'
import validator from 'validator';
import AuthContext from './auth-context'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
	const history = useHistory();
	const [email, Setemail] = useState('');
	const [password, Setpassword] = useState('');
	const [repassword, Setrepassword] = useState('');

	const [errorofemail, Seterrorofemail] = useState(false);
	const [errorofpassword, Seterrorofpassword] = useState(false);
	const [reerror, Setreerror] = useState(false);

	const [aftersubmiterr, Setaftersubmiterr] = useState(false);

	const [message, Setmessage] = useState('');

	const authCtx = useContext(AuthContext);

	const notify = (mes) => toast.error(mes);

	const emailhandler = event => {
		Setemail(event.target.value);
	};

	const passwordhandler = event => {
		Setpassword(event.target.value);
	};

	const repasswordhandler = event => {
		Setrepassword(event.target.value);
	};

	const focushandleremail = () => {
		Seterrorofemail(false);
	}
	const focushandlerpassword = () => {
		Seterrorofpassword(false);
	}
	const focushandlerrepass = () => {
		Setreerror(false);
	}


	const formsubmithandler = event => {
		event.preventDefault();

		if (!validator.isEmail(email.trim())) {
			Seterrorofemail(true);
		}
		if (password.trim().length < 8) {
			Seterrorofpassword(true);
		}
		if (repassword !== password) {
			Setreerror(true);
		}
		if (!validator.isEmail(email.trim()) || (password.trim().length < 8) || (repassword !== password)) {
			return;
		}



		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password })
		};
		fetch(`${process.env.REACT_APP_backend_url}/api/users/signup`, requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data.message) {
					Setmessage(data.message);

					notify(data.message);
					// console.log(data);
					// console.log(message);
					Setaftersubmiterr(true);
				} else {
					// console.log(data);
					authCtx.login(data.token, data.userId);
					history.replace('/');
				}
			});


	}


	return (
		<div className="mt-20 max-w-sm lg:max-w-6xl mx-auto">
			<div className="flex flex-col lg:flex-row justify-center items-center lg:mx-auto mx-2">
				<div className="lg:w-1/2 w-full">
					<img src="/signup-hero.jpg" alt="signup" />
				</div>
				<div className="lg:w-1/2 w-full  mb-10 lg:mb-0 rounded bg-gray-50 border">
					<form className="pt-7 max-w-md mx-2 lg:mx-auto  px-5 my-5">
						{/* {aftersubmiterr && <Warning message={message} delay={5000} />} */}
						<div className="flex flex-col mb-4">
							<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="email">Email</label>
							<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="email" name="email" id="email" onChange={emailhandler} onFocus={focushandleremail} value={email || ""} />
							{errorofemail && <p className="text-red-400 text-xs">Enter valid email</p>}
						</div>
						<div className="flex flex-col mb-4">
							<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="password">Password</label>
							<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded" type="password" name="password" id="password" onChange={passwordhandler} onFocus={focushandlerpassword} value={password || ""} />
							{errorofpassword && <p className="text-red-400 text-xs">enter atleast 8 characters!</p>}
						</div>
						<div className="flex flex-col mb-5">
							<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="conpassword">Confirm Password</label>
							<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded" type="password" name="repassword" id="conpassword" onChange={repasswordhandler} onFocus={focushandlerrepass} value={repassword || ""} />
							{reerror && <p className="text-red-400 text-xs">password do not match!</p>}
						</div>
						<ToastContainer />
						<button className="block bg-indigo-900 hover:bg-indigo-800  text-white  text-lg mx-auto px-6 py-1 rounded" type="submit" onClick={formsubmithandler}>Sign Up</button>
					</form>
				</div>

			</div>
		</div>
	)

}

export default Signup
