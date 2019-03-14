class Toggleable {

	constructor() {
		this.isEnabled = true;
	}

	/**
	* @description Changes isEnabled to false if isEnabled is true, and changes it to true if isEnabled is false.
	*/
	toggle() {
		if (this.isEnabled) {
			this.disable();
		} else {
			this.enable();
		}

	}

	/**
	* @description Changes isEnabled to true.
	*/
	enable() {
		this.isEnabled = true;
	}

	/**
	* @description Changes isEnabled to false.
	*/
	disable() {
		this.isEnabled = false;
	}
}