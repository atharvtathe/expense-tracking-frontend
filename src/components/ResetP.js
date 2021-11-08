import React from 'react'
import { useState, useContext } from 'react'
import validator from 'validator';
import AuthContext from './auth-context'
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import { v4 as uuidv4 } from 'uuid';

const ResetP = () => {
	const history = useHistory();
	const [first, setfirst] = useState(true);
	const [second, setsecond] = useState(false);
	const [third, setthird] = useState(false);
	const [isloading, setisloading] = useState(false);

	const [email, setemail] = useState('');
	const [otp, setotp] = useState('');
	const [password, setpassword] = useState('');
	const [passwordre, setpasswordre] = useState('');
	const [uuid, setuuid] = useState(uuidv4());
	const [mongoid, setmongoid] = useState('');

	const notifysuccess = () => toast.success("	OTP is sent to your email!");

	const notifysuccessotp = () => toast.success("OTP verified successfully!");
	const notifyreset = () => toast.success("Password reset successful!");
	const notifyresetf = () => toast.error("Password reset failed!");

	const notifysuccesserr = () => toast.error("OTP verification failed!");

	const firstsubmitHandler = () => {
		if (!email) {
			return;
		}
		setisloading(true);
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				uuid: uuid
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/users/sendotp`, requestOptions);
			const result = await res.json();
			notifysuccess();
			setisloading(false);
			setfirst(false);
			setsecond(true);
		}
		getevents();
	}

	const secondsubmitHandler = () => {
		if (!otp) {
			return;
		}
		setisloading(true);
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				otpinput: Number(otp),
				uuid: uuid,
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/users/verifyotp`, requestOptions);
			const result = await res.json();
			if (result.status === "success") {
				notifysuccessotp();
				setisloading(false)
				setmongoid(result.mongoid);
				setsecond(false);
				setthird(true);
			}
			else {
				notifysuccesserr();
				setisloading(false)
			}

		}
		getevents();
	}

	const thirdsubmitHandler = () => {
		if (!password) {
			return;
		}
		setisloading(true);
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				mongoid: mongoid,
				email: email,
				password: password
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/users/resetpass`, requestOptions);
			const result = await res.json();
			if (res.status === 200) {
				notifyreset();
				setisloading(false)
				history.replace('/login');

			}
			else {
				notifyresetf()
				setisloading(false)
			}

		}
		getevents();
	}





	return (
		<div className="mt-20 max-w-sm lg:max-w-6xl mx-auto">
			<h1 className="text-2xl mt-32 text-center">Reset Password</h1>
			<ToastContainer />
			{first && <div className="mt-10">
				<div className="flex flex-col mb-4 max-w-sm mx-3 sm:mx-auto">
					<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="email">Email</label>
					<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} />
				</div>
				<button className="block mt-5 bg-indigo-900 hover:bg-indigo-800  text-white  text-lg mx-auto px-6 py-1 rounded" onClick={firstsubmitHandler}>{isloading ? <Loader type="TailSpin" color="#FFFFFF" height={25} width={25} /> : <span>Send OTP</span>}</button>
			</div>}

			{second && <div className="mt-10">
				<div className="flex flex-col mb-4 max-w-sm mx-3 sm:mx-auto">
					<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="otp">Enter OTP that is send on your email.</label>
					<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="text" id="otp" value={otp} onChange={(e) => setotp(e.target.value)} />
				</div>
				<button className="block mt-5 bg-indigo-900 hover:bg-indigo-800  text-white  text-lg mx-auto px-6 py-1 rounded" onClick={secondsubmitHandler}>{isloading ? <Loader type="TailSpin" color="#FFFFFF" height={25} width={25} /> : <span>Verify OTP</span>}</button>
			</div>}

			{third && <div className="mt-10">
				<div className="flex flex-col mb-4 max-w-sm mx-3 sm:mx-auto">
					<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="pass">Password</label>
					<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " id="pass" type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
				</div>
				<div className="flex flex-col mb-4 max-w-sm mx-1 sm:mx-auto">
					<label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="conf">Confirm Password</label>
					<input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " id="conf" type="password" value={passwordre} onChange={(e) => setpasswordre(e.target.value)} />
				</div>
				<button className="block mt-5 bg-indigo-900 hover:bg-indigo-800  text-white  text-lg mx-auto px-6 py-1 rounded" onClick={thirdsubmitHandler}>{isloading ? <Loader type="TailSpin" color="#FFFFFF" height={25} width={25} /> : <span>Reset Password</span>}</button>
			</div>}

		</div>
	)
}

export default ResetP
