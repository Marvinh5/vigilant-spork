export interface ChamberInterface {
	niceNumber: number
}

export function echoChamber(niceChamber: ChamberInterface): ChamberInterface {
	console.log("echo chamber")
	return {
		niceNumber: niceChamber.niceNumber
	}
}