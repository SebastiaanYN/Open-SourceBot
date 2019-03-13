class Module {

	constructor() {
		this.enable = true;
	}

	toggle() {
		if (this.enable = true) {
			disable();
			this.enable = false;
		} else {
			enable();
			this.enable = true;
		}

	}

	enable() {
		this.enable = true;
		super.enable();
	}

	disable() {
		this.enable = false;
		super.disable();
	}
}
