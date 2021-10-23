import React from 'react'
import {
	Link, useHistory
} from "react-router-dom";

const Homenotlogin = () => {
	return (
		<>
			<div className="mt-24 lg:max-w-5xl mx-5 lg:mx-auto flex flex-col lg:flex-row" >

				<div className="lg:w-1/2 mt-28 mx-auto ">
					<h1 className="text-3xl lg:text-6xl font-bold text-indigo-800 ">Smart <br /> Expense Tracking</h1>

					<Link to="/signup">
						<span className="inline-block w-32 mt-10 text-center font-bold text-base lg:text-xl bg-indigo-900 text-white px-2  py-2  rounded  hover:bg-indigo-800">Sign Up</span>
					</Link>
				</div>


				<div className="lg:w-1/2 mx-auto">
					<img src="/home.jpg" className="w-96 lg:w-auto" alt="expenses" />
				</div>

			</div>

		</>
	)
}

export default Homenotlogin
