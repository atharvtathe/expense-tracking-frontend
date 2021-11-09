import { Line } from 'react-chartjs-2';
import React, { useEffect, useState, useContext } from 'react'
import AuthContext from './auth-context'

const Report = () => {

	const [labels, setlabels] = useState([]);
	const [datag, setdata] = useState([]);
	const [datayear, setdatayear] = useState([]);
	const [isloading, setloading] = useState(true);
	const [monthYear, setMonthYear] = useState(new Date().toISOString().substring(0, 7))

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				month: Number(monthYear.substring(5, 7)),
				year: Number(monthYear.substring(0, 4))
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/totalbydayarray/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setlabels(result.labellist);
			setdata(result.monthlydatalist)
			setloading(false);
		}

		const requestOptionone = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				year: Number(monthYear.substring(0, 4))
			})
		};
		const getyearly = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/totalbyyeararray/${authCtx.userid}`, requestOptionone);
			const result = await res.json();
			setdatayear(result.yealydata)
			setloading(false);
		}
		getevents();
		getyearly();

	}, []);

	const monthYearchangeHandler = (e) => {
		setMonthYear(e.target.value);
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				month: Number(e.target.value.substring(5, 7)),
				year: Number(e.target.value.substring(0, 4))
			})
		};
		const getevents = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/totalbydayarray/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setlabels(result.labellist);
			setdata(result.monthlydatalist)
			setloading(false);
		}

		const requestOptionone = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				year: Number(e.target.value.substring(0, 4))
			})
		};
		const getyearly = async () => {
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/totalbyyeararray/${authCtx.userid}`, requestOptionone);
			const result = await res.json();
			setdatayear(result.yealydata)
			setloading(false);
		}
		getevents();
		getyearly();

	}


	const data = {
		labels: labels,
		datasets: [{
			label: 'Daily Expenses',
			data: datag,
			backgroundColor: 'rgb(255, 235, 235)',
			borderColor: 'rgb(255, 99, 132)',
			borderWidth: 4,
			tension: 0.3,
			fill: true
		}]
	}

	const datayearly = {
		labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
		datasets: [{
			label: 'Monthly Expenses',
			data: datayear,
			backgroundColor: 'rgb(244, 237, 255)',
			borderColor: 'rgb(140, 59, 255)',
			borderWidth: 4,
			tension: 0.3,
			fill: true
		}]
	}

	return (
		<div className="mt-24 lg:max-w-5xl mx-auto">
			<div className="flex flex-row items-center text-base ml-2">
				<label htmlFor="monthandyear" className="text-grey-darkest mr-3">Month :</label>
				<input className="border py-1 px-1 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded" type="month" id="monthandyear" value={monthYear} onChange={(e) => monthYearchangeHandler(e)}></input>
			</div>
			<div>
				{datag && <Line data={data} />}
			</div>

			<div className="mt-10 mb-10">
				{datag && <Line data={datayearly} />}
			</div>

		</div>
	)
}

export default Report
