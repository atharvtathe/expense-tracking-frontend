import React, { useState, useEffect, useContext } from 'react'
import AuthContext from './auth-context'
import { toast } from 'react-toastify';

const Modal = ({ filterby, getbydate, month, isopen, setisopen, expenses, setExpenses, id }) => {

	const [Mamount, setAmount] = useState(0);
	const [Mreason, setReason] = useState('');
	const [Mdate, setDate] = useState('');
	const [Mtime, setTime] = useState('');
	const [Mplace, setPlace] = useState('');

	const authCtx = useContext(AuthContext);
	const notifyon = () => toast.error("Please fill all the data!");
	const notifyupdate = () => toast.success("Expense updated successfully!");

	const setdata = () => {

		var filterdata = expenses.filter(function (expense) {
			return expense._id === id;
		})
		const data = filterdata[0];

		const datadate = data.date
		const newdate = datadate.substring(0, 10)
		// console.log(newdate)

		setAmount(data.amount)
		setReason(data.reason)
		setDate(newdate)
		setTime(data.time)
		setPlace(data.place)
	}

	useEffect(() => {
		if (isopen) {
			setdata();
		}
	}, [isopen]);


	const updatehandler = () => {
		if (!Mamount || !Mplace || !Mreason || !Mdate || !Mtime) {
			// console.log("please fill all the data")
			notifyon()
			return;
		}
		const requestOptions = {
			method: 'PATCH',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				amount: Mamount,
				place: Mplace,
				reason: Mreason,
				date: Mdate,
				time: Mtime
			})

		};
		const requestOp = {
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
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/${id}`, requestOptions);
			const result = await res.json();
			if (res.status === 200) {
				notifyupdate();
			}
			const resnew = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbymonth/${authCtx.userid}`, requestOp);
			const resultnew = await resnew.json();
			setExpenses(resultnew);
		}
		getevents();
		setisopen(false);

	}




	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setisopen(false)}></div>

				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="border rounded text-sm p-5 ">
						<div className="flex flex-col mb-4 w-40">
							<label className="mb-1  text-grey-darkest" htmlFor="amount">Amount</label>
							<input className="border py-1 px-1 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="number" name="amount" value={Mamount} id="amount" autoComplete="off" onChange={e => setAmount(e.target.value)} />
						</div>
						<div className="flex flex-col mb-4">
							<label className="mb-1  text-grey-darkest" htmlFor="reason">Reason</label>
							<input className="border py-1 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="text" name="reason" value={Mreason} id="reason" autoComplete="off" onChange={e => setReason(e.target.value)} />
						</div>
						<div className="flex flex-row">
							<div className="flex flex-col mb-4 w-36">
								<label className="mb-1  text-grey-darkest" htmlFor="date">Date</label>
								<input className="border py-1 px-1 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded cursor-not-allowed" disabled={true} type="date" name="date" value={Mdate} id="date" onChange={e => setDate(e.target.value)} />
							</div>
							<div className="flex flex-col mb-4 ml-4">
								<label className="mb-1 text-grey-darkest" htmlFor="time">Time</label>
								<input className="border py-1 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded " type="time" name="time" value={Mtime} id="time" onChange={e => setTime(e.target.value)} />
							</div>

						</div>
						<div className="flex flex-col mb-4">
							<label className="mb-1 text-grey-darkest" htmlFor="location">Location</label>
							<input className="border py-1 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded" type="text" name="location" value={Mplace} id="location" autoComplete="off" onChange={e => setPlace(e.target.value)} />
						</div>
						{/* <ToastContainer /> */}

						<div className="flex flex-row justify-between">
							<button className="bg-indigo-900 px-3 py-1 hover:bg-indigo-800 border-none text-white rounded" onClick={updatehandler}>Update</button>
							<button className="bg-red-500 px-3 py-1 hover:bg-red-600 border-none text-white rounded" onClick={() => setisopen(false)}>Cancel</button>
						</div>



					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
