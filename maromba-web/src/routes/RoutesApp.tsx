import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoute";
import { AuthProvider } from "../contexts/AuthProvider/AuthProvider";
import { Login } from "../pages/Login/Login";
import { Menu } from "../pages/Menu/Menu";
import { User } from "../pages/User/User";
import { Users } from "../pages/User/Users";
import { Companies } from "../pages/Company/Companies";
import { Company } from "../pages/Company/Company";
import { Exercises } from "../pages/Exercise/Exercises";
import { Exercise } from "../pages/Exercise/Exercise";

export function RoutesApp() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/menu"
						element={
							<ProtectedRoutes>
								<Menu />
							</ProtectedRoutes>
						}
					>
						<Route
							path="/menu/users"
							element={
								<ProtectedRoutes>
									<Users />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							path="/menu/user"
							element={
								<ProtectedRoutes>
									<User />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							path="/menu/companies"
							element={
								<ProtectedRoutes>
									<Companies />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							path="/menu/company"
							element={
								<ProtectedRoutes>
									<Company />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							path="/menu/exercises"
							element={
								<ProtectedRoutes>
									<Exercises />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							path="/menu/exercise"
							element={
								<ProtectedRoutes>
									<Exercise />
								</ProtectedRoutes>
							}
						></Route>
					</Route>
					<Route path="*" element={<Login />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}
