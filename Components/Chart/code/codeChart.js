class chartFetch {
	constructor() {
		this.data_template = [];
	}

	async get_data_template() {
		let bolo = await fetch("http://localhost:3333/demo", {
			method: "POST",
		}).then((res) => res.json());

		return bolo;
	}
}

export default new chartFetch();
