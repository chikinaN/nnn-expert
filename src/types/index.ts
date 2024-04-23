import { Dispatch, SetStateAction } from "react";

export type StateType<T> = Dispatch<SetStateAction<T>>

export type EnemyType = {
	type: number;
	hp: number;
	create_at: number;
}
