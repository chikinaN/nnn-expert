import { useEffect, useState } from "react";
import AntherPreview from "../components/game/AntherPreview";
import AttackInput from "../components/game/AttackInput";
import { StateType } from "../types";
// import GamePreview from "../components/game/GamePreview";

type GamePropsType = {
	change: StateType<number>;
	setScore: StateType<number>;
}

const AntherCreate = (length: number): string[] => {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	return Array(length).fill(null).map(() => alphabet[Math.floor(Math.random() * alphabet.length)]);
}

function Game(props: GamePropsType ) {
	const [score, setScore] = useState<number>(0);
	const [text, setText] = useState<string[]>(AntherCreate(5));
	const [complete, setComplete] = useState<boolean>(false);
	const [timer, setTimer] = useState(120);
	const [failed, setFailed] = useState<boolean>(false);
	// const [attack, setAttack] = useState<boolean>(false);
	// const [gameOver, setGameOver] = useState<boolean>(false);
	useEffect(() => {
		if (complete) {
			setScore((prev) => prev + 1);
			setComplete(false);
		}
	}, [complete]);
	useEffect(() => {
		if (failed) {
			setTimer(prevTimer => prevTimer - 1);
			setFailed(false);
		}
	}, [failed]);

	useEffect(() => {
		if (score !== 0) {
			setText(AntherCreate(5));
			setComplete(false);
			// setAttack(true);
			setTimer(prevTimer => prevTimer + 1);
		}
	}, [score]);

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer(prevTimer => {
				if (prevTimer > 0) {
					return prevTimer - 1;
				} else if (prevTimer === 0) {
					props.change(2);
					props.setScore(score);
					return 0;
				} else {
					return 0;
				}
			});
		}, 1000);
			return () => clearInterval(countdown);
	}, [props, score]);
	// useEffect(() => {
	// 	if (gameOver) {
	// 		props.change(2);
	// 		props.setScore(score);
	// 	}
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// },[gameOver])
	return (
		<section>
			<p>Score: {score} time:{timer}</p>
			<AntherPreview text={text} />
			{/* <GamePreview attack={attack} completeAttack={setAttack} gameOver={setGameOver} /> */}
			<AttackInput anther={text} complete={setComplete} failed={setFailed} />
		</section>
	)
}

export default Game;
