import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import { Calculator } from "./components/calculator/Calculator";

function App() {
	const BG = { backgroundColor: "#ecf9d5" };
	return (
		<div style={BG}>
			<Calculator />
		</div>
	);
}

export default App;
