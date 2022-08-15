import { IPoint } from "../BuildingModel/Geom/Point";
import NaturalMap from "../BuildingModel/NaturalMap";
import ClimateShower from "./ClimateShower";
import ShowHeight from "./toShowHeight";
import ShowTest from "./toShowTest";
import ShowWater from "./toShowWater";


export default class ShowerManager {
	private _sc: ClimateShower | undefined;
	private _sh: ShowHeight | undefined;
	private _sw: ShowWater | undefined;
	private _st: ShowTest | undefined;

	private _w: NaturalMap;
	private _a: number;
  private _z: IPoint;
	// private _f: string;

	constructor(world: NaturalMap, area: number, SIZE: IPoint/*, folderSelected: string*/) {
		this._w = world;
		this._a = area;
    this._z = SIZE;
		// this._f = folderSelected;
	}

	get sc(): ClimateShower {
		if (!this._sc)
			this._sc = new ClimateShower(this._w, this._a, this._z);
		return this._sc;
	}

	get sh(): ShowHeight {
		if (!this._sh)
			this._sh = new ShowHeight(this._w, this._a, this._z);
		return this._sh;
	}

	get sw(): ShowWater {
		if (!this._sw)
			this._sw = new ShowWater(this._w, this._a, this._z);
		return this._sw;
	}

	get st(): ShowTest {
		if (!this._st)
			this._st = new ShowTest(this._w, this._a, this._z);
		return this._st;
	}
	
}