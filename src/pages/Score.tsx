import { StateType } from "../types";

type ScorePropsType = {
	change: StateType<number>;
	score: number;
}

function Score(props: ScorePropsType) {
	return (
		<section>
			<h1>My Score: {props.score}</h1>
			<button onClick={() => props.change(0)}>Back</button>
		</section>
	)
}

export default Score;
