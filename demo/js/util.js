const lastPathSegmentRegex = /\/(?:.(?!\/))+$/g;

function redirect(path) {
	document.location.href = window.location.href.replace(lastPathSegmentRegex, "") + path;
}

document.addEventListener("DOMContentLoaded", () => {
	const searchBox = document.querySelector('[data-track-id="searchBox"]');
	const suggestLayer = document.querySelector('#suggestLayer');
	const suggestLayerTarget = document.querySelector('#suggestLayerTarget');

	searchBox.addEventListener("focus", () => suggestLayer.style.opacity = "1");
	searchBox.addEventListener("blur", () => requestAnimationFrame(() => suggestLayer.style.opacity = "0"))

	Array.from(document.querySelectorAll(".searchTerm"))
		.forEach(ele => ele.addEventListener("click", (event) => {
			redirect(`/product-listing.html?query=${event.currentTarget.innerText}`);
		}));
});

document.addEventListener("DOMContentLoaded", () => {
	/**
	 * Trigger Search
	 */
	document.querySelector("form").addEventListener("submit", event => {
		event.preventDefault();

		const query = document.querySelector("input").value;
		if (query)
			redirect(`/product-listing.html?query=${query}`);
	});
	document.querySelector('[data-track-id="searchButton"]').addEventListener("click", event => {
		const query = document.querySelector("input").value;
		if (query)
			redirect(`/product-listing.html?query=${query}`);
	});


	/**
	 * Logo Click
	 */
	document.querySelector(".logoContainer")?.addEventListener("click", event => {
		event.preventDefault();
		redirect(`/index.html`);
	});

	/**
	 * Product Click
	 */
	Array.from(document.querySelectorAll("main.products a")).forEach(anchor => {
		anchor.addEventListener("click", (e) => {
			e.preventDefault();
			redirect(`/product-detail.html?id=${e.currentTarget.getAttribute("data-product-id")}`)
		});
	});


	/**
	 * AddToBasket Click
	 */
	Array.from(document.querySelectorAll("main.pdp button")).forEach(anchor => {
		anchor.addEventListener("click", (e) => {
			e.preventDefault();
			basket.add(e.currentTarget.getAttribute("data-product-id"));
			redirect(`/basket.html`)
		});
	});

	/**
	 * Make Purchase Click
	 */
	Array.from(document.querySelectorAll("main.basket button")).forEach(anchor => {
		anchor.addEventListener("click", (e) => {
			e.preventDefault();
			redirect(`/order.html`)
		});
	});

	/**
	 * Commit and buy Click
	 */
	Array.from(document.querySelectorAll("main.order button")).forEach(anchor => {
		anchor.addEventListener("click", (e) => {
			e.preventDefault();
			basket.clear();
			redirect(`/thankyou.html`)
		});
	});

	/**
	 * Clear Events
	 */
	document.querySelector("#clearEvents")?.addEventListener("click", () => {
		localStorage.setItem("____localstorageWriter", "[]");

		localStorage.setItem("search-collector-trail", "{}");
		sessionStorage.setItem("search-collector-trail", "{}");

		document.cookie = "SearchCollectorSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		document.querySelector("#events").innerHTML = "";
		document.location.reload();
	});

	/**
	 * BasketContainer click
	 */
	document.querySelector(".basketContainer")?.addEventListener("click", () => redirect("/basket.html"));

	document.querySelector('[data-track-id="searchBox"]').value = new URLSearchParams(location.search).get("query");
	updateBasketAmount();
})

function sanitize(textContent = "") {
	return String(textContent).replace(/[\t|\n|\*]/gm, "")
}

function extractPrice(text) {
	const priceRegex = /\d+(?:\.\d+)?/g;
	const regexRexResult = sanitize(text)?.match(priceRegex);
	if (regexRexResult && regexRexResult.length > 0)
		return Number(regexRexResult[0]);
}

function updateBasketAmount() {
	const container = document.querySelector("#basketAmountContainer");
	if (container)
		container.innerText = basket.list().length;
}

const basket = {
	add(id) {
		let basket = [];

		let val = sessionStorage.getItem("basket");
		if (val) {
			basket = JSON.parse(val);
		}
		basket.push(id);
		sessionStorage.setItem("basket", JSON.stringify(basket));
	},
	remove(id) {
		let val = sessionStorage.getItem("basket");
		if (val) {
			let basket = JSON.parse(val);
			basket = basket.filter(el => el !== id);
			sessionStorage.setItem("basket", JSON.stringify(basket));
		}
	},
	list() {
		let val = sessionStorage.getItem("basket");
		return val ? JSON.parse(val) : [];
	},
	toItems() {
		const ids = this.list();
		return Object.values(
			ids.reduce((acc, id) => {
				const item = acc[id] || {...items[id], quantity: 0};
				item.quantity++;
				acc[id] = item;
				return acc;
			}, {}));
	},
	clear() {
		sessionStorage.removeItem("basket");
	}
};

const items = {
	"1234": {
		id: "1234",
		name: "Pink Dress",
		image: "images/pink_dress.png"
	}, "1235": {
		id: "1235",
		name: "Pink High Heel",
		image: "images/pink_high_heel.png"
	}, "1236": {
		id: "1236",
		name: "Purple Boot",
		image: "images/purple_boot.png"
	}, "1237": {
		id: "1237",
		name: "Green Leather Shoe",
		image: "images/green_leather_shoe.png"
	}, "1238": {
		id: "1238",
		name: "Grey Polo",
		image: "images/grey_polo.png"
	}, "1239": {
		id: "1239",
		name: "Yellow Sneaker",
		image: "images/yellow_sneaker.png"
	}, "1240": {
		id: "1240",
		name: "Grey Shirt",
		image: "images/grey_tshirt.png"
	}, "1241": {
		id: "1241",
		name: "Blue Trousers",
		image: "images/blue_trousers.png"
	}, "1242": {
		id: "1242",
		name: "Green Coat",
		image: "images/green_coat.png"
	}
}

/**
 * Used for demo purposes only, store all events in localstorage.
 * For live environments rely on DefaultWriter class shipped with the search-collector packages
 */
class DemoWriter {

	constructor(queryResolver, sessionResolver, channel, debug) {

		const localstorageWriter = {
			write: (data) => {
				const dataArr = JSON.parse(localStorage.getItem("____localstorageWriter") || "[]");
				dataArr.push(data);
				localStorage.setItem("____localstorageWriter", JSON.stringify(dataArr));
			}
		}
		const SearchCollector = window.SearchCollector;
		let writer = new SearchCollector.DebugWriter(localstorageWriter, debug);
		writer = new SearchCollector.QueryWriter(writer, queryResolver);
		writer = new SearchCollector.TrailWriter(writer, new SearchCollector.Trail(queryResolver, sessionResolver), queryResolver);
		writer = new SearchCollector.JSONEnvelopeWriter(writer, sessionResolver, channel);
		writer = new SearchCollector.BrowserTrackingWriter(writer, {
			recordReferrer: true,
			recordUrl: true,
			recordLanguage: true
		});

		this.writer = writer;
	}

	write(data) {
		this.writer.write(data);
	}
}
