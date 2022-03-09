const lastPathSegmentRegex = /\/(?:.(?!\/))+$/g;

function redirect(path) {
	document.location.href = window.location.href.replace(lastPathSegmentRegex, "") + path;
}

/**
 * Trigger Search
 */
document.querySelector("form").addEventListener("submit", event => {
	event.preventDefault();

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
		redirect(`/product-detail.html`)
	});
});


/**
 * AddToBasket Click
 */
Array.from(document.querySelectorAll("main.pdp button")).forEach(anchor => {
	anchor.addEventListener("click", (e) => {
		e.preventDefault();
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
