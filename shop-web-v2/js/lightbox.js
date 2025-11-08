function openLightbox() {
	document.querySelector(".overlay").classList.add("active");
	document.querySelector(".lightbox").classList.add("active");
}

function closeLightbox() {
	document.querySelector(".overlay").classList.remove("active");
	document.querySelector(".lightbox").classList.remove("active");
}

// Cerrar con tecla ESC
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		closeLightbox();
	}
});
