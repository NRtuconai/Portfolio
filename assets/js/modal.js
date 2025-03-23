let modalOpen = false;

// Sélectionnez tous les boutons d'ouverture de modal
const boutons = document.querySelectorAll('.goToProject');

// Parcourez chaque bouton et ajoutez un gestionnaire d'événements à chacun
boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function (event) {
        event.stopPropagation(); // Éviter la propagation du clic à document
        const modalID = bouton.getAttribute("data-target");
        enableModal(modalID);
    });
});

function enableModal(BtnModal) {
    const DivModal = document.getElementById(BtnModal);
    const body = document.querySelector('body');

    DivModal.classList.add('active');
    body.classList.add('modal_active');

    modalOpen = true;
}

function disableModal(BtnModal) {
    const DivModal = document.getElementById(BtnModal);
    const body = document.querySelector('body');

    DivModal.classList.add('out');
    body.classList.remove('modal_active');

    setTimeout(function () {
        DivModal.classList.remove('active');
        DivModal.classList.remove('out');
    }, 500);

    modalOpen = false;
}

// Ajouter un gestionnaire d'événements de clic au document pour fermer le modal actif
document.addEventListener("click", function (event) {
    if (modalOpen) {
        const openModals = document.querySelectorAll('.modal.active');

        openModals.forEach(function (DivModal) {
            // Vérifie si on clique sur une image dans le modal principal
            if (event.target.tagName === "IMG" && DivModal.contains(event.target)) {
                return; // Ne rien faire
            }

            // Vérifie si on clique sur le modal de l'image zoomée
            if (event.target.closest("#imageModal")) {
                return; // Ne rien faire
            }

            // Si on clique à l'extérieur, fermer le modal
            if (event.target !== DivModal && !DivModal.contains(event.target)) {
                const BtnModal = DivModal.id;
                disableModal(BtnModal);
            }
        });
    }
});

let scale = 1;
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

function openImageModal(src) {
    modalImage.src = src;
    scale = 1;
    currentX = 0;
    currentY = 0;
    modalImage.style.transform = `translate(0px, 0px) scale(1)`;
    imageModal.classList.add("show");
}

function closeImageModal() {
    imageModal.classList.remove("show");
}

// ZOOM avec la molette
modalImage.addEventListener("wheel", (event) => {
    event.preventDefault();
    let zoomFactor = 0.1;
    scale += event.deltaY > 0 ? -zoomFactor : zoomFactor;
    scale = Math.min(Math.max(1, scale), 3); 

    modalImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
});

// Toggle du mode déplacement au clic
modalImage.addEventListener("click", () => {
    isDragging = !isDragging;
    modalImage.style.cursor = isDragging ? "grabbing" : "default";
});

// Déplacement libre quand activé
document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    currentX = event.clientX - modalImage.width / 2;
    currentY = event.clientY - modalImage.height / 2;

    modalImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
});

// Fermeture en cliquant à l'extérieur
imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

// Ajout du clic sur toutes les images dans les modals
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal .body img").forEach(img => {
        img.addEventListener("click", () => openImageModal(img.src));
    });
});
