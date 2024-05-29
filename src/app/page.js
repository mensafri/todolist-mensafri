import EditTodo from "@/components/EditTodo";
import TodoForm from "@/components/TodoForm";
import { supabase } from "@/lib/supabase";
import deleteTodo from "@/server-actions/deleteTodo";

export default async function Home() {
	const { data: todos, error } = await supabase.from("todos").select("*");

	console.log(todos);

	if (error) {
		console.log("Error fetching databases", error);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-gray-300">
			<div className="container mx-auto p-6 sm:p-12">
				<div className="flex justify-between items-start">
					<h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
						My To-do List
					</h1>
				</div>
				<TodoForm />
				<div className="mt-6">
					{todos.map((todo) => (
						<div
							key={todo.id}
							className="mb-4 p-6 bg-gray-900 rounded-lg shadow-md">
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-2xl font-semibold text-white mb-1">
										{todo.title}
									</h2>
									<p className="text-gray-400 mb-2">{todo.description}</p>
									<span
										className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
											todo.is_completed
												? "bg-green-500 text-white"
												: "bg-yellow-500 text-black"
										}`}>
										{todo.is_completed ? "Completed" : "Incomplete"}
									</span>
								</div>
								<div className="flex space-x-3">
									<form action={deleteTodo}>
										<input
											type="hidden"
											name="id"
											value={todo.id}
										/>
										<button
											type="submit"
											className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
											Delete
										</button>
									</form>
									<EditTodo todo={todo} />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
