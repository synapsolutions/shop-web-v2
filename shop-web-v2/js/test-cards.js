// Datos de tarjetas organizadas por procesador
const processorsData = {
	izipay: {
		name: "Izipay",
		description: "Tarjetas de prueba",
		cards: [
			{
				type: "Visa",
				number: "4970 1000 0000 0022",
				description: "Pago exitoso",
				cvv: "123",
			},
			{
				type: "Visa (frictionless)",
				number: "4970 1100 0000 1029",
				description: "Pago exitoso",
				cvv: "123",
			},
			{
				type: "Visa (challenge)",
				number: "4970 1100 0000 1003",
				description: "Pago exitoso - review@review.com",
				cvv: "123",
			}
		],
	},
	synapsis: {
		name: "Synapsis",
		description: "Tarjetas de prueba",
		cards: [
			{
				type: "Visa",
				number: "4242 4242 4242 4242",
				description: "Pago exitoso",
				cvv: "123",
			},
			{
				type: "Mastercard",
				number: "5555 5555 5555 4444",
				description: "Pago exitoso",
				cvv: "123",
			},
			{
				type: "American Express",
				number: "3782 822463 10005",
				description: "Pago exitoso",
				cvv: "1234",
			},
            {
				type: "Diners Club",
				number: "3654 8485 6815 51",
				description: "Pago exitoso",
				cvv: "123",
			},
			{
				type: "Visa",
				number: "4859 5100 0000 0077",
				description: "Pago rechazado",
				cvv: "123",
			},
		],
	},
};

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
	initializeProcessorTabs();
	initializeEventListeners();
});

function initializeProcessorTabs() {
	const processorTabs = document.getElementById("processorTabs");
	const cardsGroups = document.getElementById("cardsGroups");

	// Limpiar contenedores
	processorTabs.innerHTML = "";
	cardsGroups.innerHTML = "";

	// Crear tabs y grupos
	Object.keys(processorsData).forEach((processorId, index) => {
		const processor = processorsData[processorId];

		// Crear tab
		const tab = document.createElement("div");
		tab.className = `processor-tab ${index === 0 ? "active" : ""}`;
		tab.textContent = processor.name;
		tab.dataset.processor = processorId;
		processorTabs.appendChild(tab);

		// Crear grupo de tarjetas
		const group = document.createElement("div");
		group.className = `cards-group ${index === 0 ? "active" : ""}`;
		group.id = `group-${processorId}`;

		const groupTitle = document.createElement("h3");
		groupTitle.className = "group-title";
		groupTitle.innerHTML = `${processor.name} <span class="processor-badge">${processor.cards.length} tarjetas</span>`;
		group.appendChild(groupTitle);

		const groupDescription = document.createElement("p");
		groupDescription.className = "group-description";
		groupDescription.textContent = processor.description;
		group.appendChild(groupDescription);

		const cardGrid = document.createElement("div");
		cardGrid.className = "card-grid";

		// Agregar tarjetas al grupo
		processor.cards.forEach((card) => {
			const cardElement = document.createElement("div");
			cardElement.className = "test-card";
			cardElement.innerHTML = `
                            <button class="copy-btn" data-number="${card.number.replace(
															/\s/g,
															""
														)}">Copiar</button>
                            <h4>${card.type}</h4>
                            <div class="card-number">${card.number}</div>
                            <div class="card-type">${card.description}</div>
                            <div class="card-info">CVV: ${card.cvv}</div>
                            <div class="card-info">Fecha: Cualquier fecha mayor a hoy</div>
                        `;
			cardGrid.appendChild(cardElement);
		});

		group.appendChild(cardGrid);
		cardsGroups.appendChild(group);
	});
}

function initializeEventListeners() {
	// Tabs de procesadores - Usar delegación de eventos CORRECTA
	document
		.getElementById("processorTabs")
		.addEventListener("click", function (e) {
			const tab = e.target.closest(".processor-tab");
			if (tab) {
				// Remover active de todos los tabs
				document
					.querySelectorAll(".processor-tab")
					.forEach((t) => t.classList.remove("active"));
				document
					.querySelectorAll(".cards-group")
					.forEach((g) => g.classList.remove("active"));

				// Activar tab y grupo seleccionado
				tab.classList.add("active");
				const processorId = tab.dataset.processor;
				const group = document.getElementById(`group-${processorId}`);
				if (group) {
					group.classList.add("active");
				}
			}
		});

	// Botones de copiar - Usar delegación de eventos
	document
		.getElementById("cardsGroups")
		.addEventListener("click", function (e) {
			if (e.target.classList.contains("copy-btn")) {
				const cardNumber = e.target.dataset.number;
				copyToClipboard(cardNumber);
				showCopyNotification();
			}
		});

	// Control de la sección colapsable
	const testCardsSection = document.getElementById("testCardsSection");
	const toggleSection = document.getElementById("toggleSection");

	toggleSection.addEventListener("click", function (e) {
		e.stopPropagation();
		testCardsSection.classList.toggle("expanded");
	});

	// Cerrar al hacer clic fuera
	document.addEventListener("click", function (e) {
		if (
			!testCardsSection.contains(e.target) &&
			testCardsSection.classList.contains("expanded")
		) {
			testCardsSection.classList.remove("expanded");
		}
	});

	// Prevenir cierre al hacer clic dentro del content
	document
		.getElementById("cardsContent")
		.addEventListener("click", function (e) {
			e.stopPropagation();
		});
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).catch((err) => {
		// Fallback para navegadores antiguos
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);
	});
}

function showCopyNotification() {
	const notification = document.getElementById("copyNotification");
	notification.classList.add("show");
	setTimeout(() => {
		notification.classList.remove("show");
	}, 2000);
}
