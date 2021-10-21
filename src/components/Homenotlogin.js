import React from 'react'
import {
	Link, useHistory
} from "react-router-dom";

const Homenotlogin = () => {
	return (
		<>
			<div className="mt-24 lg:max-w-5xl mx-5 lg:mx-auto flex flex-col lg:flex-row justify-center items-center" >

				<div className="lg:w-1/2">
					<h1 className="text-3xl lg:text-6xl font-bold text-indigo-800 ">Smart <br /> Expense Tracking</h1>

					<Link to="/signup">
						<div className="w-32 mt-10 text-center font-bold text-base lg:text-xl bg-indigo-900 text-white px-2  py-2  rounded  hover:bg-indigo-800">Sign Up</div>
					</Link>
				</div>


				<div className="flex justify-center items-center lg:w-1/2">
					<img src="/home.jpg" alt="expenses" />
				</div>

			</div>

		</>
	)
}

export default Homenotlogin
