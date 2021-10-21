import { Line } from 'react-chartjs-2';
import React, { useEffect, useState, useContext } from 'react'
import AuthContext from './auth-context'

const Report = () => {

	const [labels, setlabels] = useState([]);
	const [datag, setdata] = useState([]);
	const [datayear, setdatayear] = useState([]);
	const [isloading, setloading] = useState(true);
	const [month, setMonth] = useState(new Date().getMonth() + 1);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			},
			body: JSON.stringify({
				month: 10
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
				year: 2021
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
			const res = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/totalbydayarray/${authCtx.userid}`, requestOptions);
			const result = await res.json();
			setlabels(result.labellist);
			setdata(result.monthlydatalist)
			setloading(false);
		}
		getevents();


	}



	const data = {
		labels: labels,
		datasets: [{
			label: 'Daily Expenses',
			data: datag,
			backgroundColor: 'rgb(255, 249, 64)',
			borderColor: 'rgb(255, 99, 132)',
			borderWidth: 4,
			tension: 0.3
		}]
	}

	const datayearly = {
		labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
		datasets: [{
			label: 'Monthly Expenses',
			data: datayear,
			backgroundColor: 'rgb(255, 249, 64)',
			borderColor: 'rgb(140, 59, 255)',
			borderWidth: 4,
			tension: 0.3
		}]
	}

	return (
		<div className="mt-24 lg:max-w-5xl mx-auto">
			<div className="flex flex-row items-center text-base ml-2">
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
