import React, { useContext } from 'react'
import AuthContext from './auth-context'
import { toast } from 'react-toastify';

const Modal = ({ filterby, getbydate, month, isopendel, setisopendel, expenses, setExpenses, id }) => {

	const authCtx = useContext(AuthContext);

	const notifydelete = () => toast.success("Expense deleted successfully!");


	const deletehandler = () => {
		const requestOptions = {
			method: 'DELETE',
			headers: {
				"Content-type": "application/json",
				'Authorization': `Bearer ${authCtx.token}`
			}
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
				notifydelete();
			}
			const resnew = await fetch(`${process.env.REACT_APP_backend_url}/api/expense/listbymonth/${authCtx.userid}`, requestOp);
			const resultnew = await resnew.json();
			setExpenses(resultnew);
		}
		getevents();
		setisopendel(false);

	}




	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setisopendel(false)}></div>

				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="border rounded text-sm p-5">

						<div className="text-lg mb-3">
							Are you sure you want to permanently delete the selected expense ?
						</div>


						<div className="flex flex-row justify-between">
							<button className="bg-red-500 px-3 py-1 hover:bg-red-600 border-none text-white rounded" onClick={deletehandler}>Delete</button>
							<button className="bg-indigo-800 px-3 py-1 hover:bg-indigo-900 border-none text-white rounded" onClick={() => setisopendel(false)}>Cancel</button>
						</div>


					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
