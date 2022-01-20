import { marvin } from "./other_things/marivn"

export interface ChamberInterface {
	niceNumber: number
}

export function echoChamber(niceChamber: ChamberInterface): ChamberInterface {
	console.log("echo chamber")
	marvin();
	return {
		niceNumber: niceChamber.niceNumber
	}
}