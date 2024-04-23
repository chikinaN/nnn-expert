import { useState } from "react";
import Title from "./pages/Title";
import Game from "./pages/Game";
import Score from "./pages/Score";

function App() {
	const [section, setSection] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	return (
		<>
			{section === 0 && (
				<Title change={setSection} />
			)}
			{section === 1 && (
				<Game change={setSection} setScore={setScore} />
			)}
			{section === 2 && (
				<Score change={setSection} score={score} />
			)}
		</>
	)
}

export default App;
