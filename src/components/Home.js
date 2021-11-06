import React, { useEffect, useState, useContext } from 'react'
import Calendar from 'react-calendar';
import AuthContext from './auth-context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';

import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import Loader from "react-loader-spinner";

import Modal from './Modal';
import Modaldel from './Modaldel'
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
	const [isloading, setloading] = useState(false);
	const [expenses, setExpenses] = useState([]);
	const [value, onChange] = useState(new Date());

	const [amount, setAmount] = useState(0);
	const [reason, setReason] = useState('');
	const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
	const [time, setTime] = useState('');
	const [place, setPlace] = useState('');
	const [id, setid] = useState('');
	const [isopen, setisopen] = useState(false);
	const [isopendel, setisopendel] = useState(false);
	const [total, settotal] = useState(0);

	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [getbydate, setgetbydate] = useState(new Date().toISOString().substring(0, 10));
	const [filterby, setfilterby] = useState(true);

	const authCtx = useContext(AuthContext);

	const notify = () => toast.error("Please fill all the data!");
	const notifysuccess = () => toast.success("Expense added successfully!");


	useEffect(() => {

		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				month: Number(month)
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbymonth/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setExpenses(result);
			setloading(false);
		}
		getevents();

	}, []);

	useEffect(() => {
		let total_temp = 0;
		for (let index = 0; index < expenses.length; index++) {
			const temp = expenses[index];
			total_temp = total_temp + temp.amount;
		}
		settotal(total_temp);

	}, [expenses]);

	const addexpensehandler = async () => {

		if (!amount || !reason || !date) {
			// console.log("please fill all the data")
			notify();
			return;
		}
		setloading(true);
		setAmount(0);
		// setDate('');
		setReason('');
		setPlace('');
		setTime('');
		const requestOption = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				amount: amount,
				place: place,
				reason: reason,
				date: date,
				time: time
			})
		};

		const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/add-expense`, requestOption);
		const result = await res.json();
		if (res.status === 201) {
			notifysuccess();
		}
		if (result) {
			const requestOptions = {
				method: 'POST',
				headers: {
					"Content-type": "application/json",
					'Authorization': `Bearer ${authCtx.token}`
				},
				body: JSON.stringify({
					month: Number(month)
				})
			};
			const getevents = async () => {
				const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbymonth/${authCtx.userid}`, requestOptions);
				const result = await res.json();
				setExpenses(result);
				setloading(false);
			}
			getevents();
			setloading(false);
		}


	}


	const editonclick = (id) => {
		setid(id)
		setisopen(true)
	}

	const deleteonclick = (id) => {
		setid(id)
		setisopendel(true)
	}

	const monthchangehandler = (e) => {
		setMonth(e.target.value);
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				month: Number(e.target.value)
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbymonth/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setExpenses(result);
			setloading(false);
		}
		getevents();

	}

	const datechangehandler = (e) => {
		setgetbydate(e.target.value);
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				date: e.target.value
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbydate/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setExpenses(result);
			setloading(false);
		}
		getevents();
	}


	const monthlybutton = () => {
		setfilterby(true)
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				month: Number(month)
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbymonth/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setExpenses(result);
			setloading(false);
		}
		getevents();

	}


	const bydatebutton = () => {
		setfilterby(false)
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				date: getbydate
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbydate/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setExpenses(result);
			setloading(false);
		}
		getevents();

	}



	return (
		<div className="mt-24 max-w-sm lg:max-w-5xl mx-auto" >
			<div className="rounded border  p-5 flex flex-col lg:flex-row justify-center items-center bg-gray-50 mx-2 lg:mx-0">
				<div className="w-1/2 mx-auto flex justify-center items-center">
					<div className="border rounded text-sm p-3 w-80">
						<div className="flex flex-col mb-4 w-40">
							<label className="mb-1  text-grey-darkest" htmlFor="amount">Amount</label>
							<input className="border py-1 px-1 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="number" name="amount" value={amount} id="amount" autoComplete="off" onChange={e => setAmount(e.target.value)} />
						</div>
						<div className="flex flex-col mb-4">
							<label className="mb-1  text-grey-darkest" htmlFor="reason">Reason</label>
							<input className="border py-1 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="text" name="reason" value={reason} id="reason" autoComplete="off" onChange={e => setReason(e.target.value)} />
						</div>
						<div className="flex flex-row">
							<div className="flex flex-col mb-4 w-36">
								<label className="mb-1  text-grey-darkest" htmlFor="date">Date</label>
								<input className="border py-1 px-1 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="date" name="date" value={date} id="date" onChange={e => setDate(e.target.value)} />
							</div>
							<div className="flex flex-col mb-4 ml-4">
								<label className="mb-1 text-grey-darkest" htmlFor="time">Time</label>
								<input className="border py-1 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="time" name="time" value={time} id="time" onChange={e => setTime(e.target.value)} />
							</div>

						</div>
						<div className="flex flex-col mb-4">
							<label className="mb-1 text-grey-darkest" htmlFor="location">Location</label>
							<input className="border py-1 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded" type="text" name="location" value={place} id="location" autoComplete="off" onChange={e => setPlace(e.target.value)} />
						</div>
						<ToastContainer />

						<button className="bg-indigo-900 w-16 px-3 py-1 hover:bg-indigo-800 border-none text-white rounded flex justify-center" onClick={addexpensehandler}>{isloading ? <Loader type="TailSpin" color="#FFFFFF" height={20} width={20} /> : <span>Add</span>}</button>

					</div>
				</div>
				<div className="w-1/2 flex justify-center items-center">
					<div className="my-5 flex justify-center items-center w-72 lg:w-full">
						<Calendar
							className="rounded-md"
							onChange={onChange}
							value={value}
						/>
					</div>
				</div>
			</div>

			<div className=" mt-10 mb-10 mx-2 lg:mx-0">

				<h2 className="font-bold">Total Expense : {total}</h2>



				<div className="flex flex-row my-5">
					<button className={`font-bold px-3 py-1 rounded border-indigo-900 border-2 mr-3 focus:outline-white ${filterby ? "bg-indigo-900 text-white" : "bg-white text-indigo-900"}`} onClick={() => monthlybutton()}>Monthly</button>
					<button className={`font-bold px-3 py-1 rounded border-indigo-900 border-2 mr-3 focus:outline-white ${filterby ? "bg-white text-indigo-900 " : "bg-indigo-900 text-white"}`} onClick={() => bydatebutton()}>By Date</button>
				</div>

				{filterby && <div className="flex flex-row items-center text-base">
					<label htmlFor="cars" className="text-grey-darkest mr-3">Month :</label>

					<select name="cars" id="cars" className="border py-1 px-1 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded" value={month} onChange={monthchangehandler}>
						<option value="1">January</option>
						<option value="2">February</option>
						<option value="3">March</option>
						<option value="4">April</option>
						<option value="5">May</option>
						<option value="6">June</option>
						<option value="7">July</option>
						<option value="8">August</option>
						<option value="9">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</div>}

				{!filterby && <div className="flex flex-row items-center text-base">
					<label className="text-grey-darkest text-grey-darkest mr-3" htmlFor="date">Date :</label>
					<input className="border py-1 w-40 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="date" name="date" value={getbydate} id="date" onChange={datechangehandler} />
				</div>}






				<div className={`${isopen ? "block" : "hidden"}`} ><Modal filterby={filterby} getbydate={getbydate} month={month} isopen={isopen} setisopen={setisopen} id={id} expenses={expenses} setExpenses={setExpenses} /></div>
				<div className={`${isopendel ? "block" : "hidden"}`} ><Modaldel filterby={filterby} getbydate={getbydate} month={month} isopendel={isopendel} setisopendel={setisopendel} id={id} expenses={expenses} setExpenses={setExpenses} /></div>
				<div className="mt-5">
					<div className="flex flex-col">
						<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-indigo-900">
											<tr>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
													Reason
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
													Location
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
													Amount
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
													Date
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
													Time
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">

												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{expenses.length !== 0 && expenses.map((expense) => {
												const { _id, amount, place, date, reason, time } = expense;
												const datenew = new Date(date)
												const readabledate = datenew.toDateString()
												return <tr key={_id}>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm text-gray-900">{reason}</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm text-gray-900">{place}</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														{amount}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														{readabledate}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														{time}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-row  items-center">
														<div className="mr-1 cursor-pointer" onClick={() => editonclick(_id)}><FiEdit /></div>
														<div className="cursor-pointer" onClick={() => deleteonclick(_id)}><RiDeleteBinLine /></div>
													</td>
												</tr>
											})}

										</tbody>
									</table>
									{expenses.length === 0 && <div className="text-lg my-8 text-center mx-auto w-full">
										🙂 You have no expenses!
									</div>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
