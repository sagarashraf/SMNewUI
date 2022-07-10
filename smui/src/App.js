import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import { Calculator } from "./components/calculator/Calculator";

function App() {
	return (
		<Container>
			<Calculator />
		</Container>
	);
}

export default App;
