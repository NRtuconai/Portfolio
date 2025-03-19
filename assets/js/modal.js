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
            if (event.target !== DivModal && !DivModal.contains(event.target)) {
                const BtnModal = DivModal.id;
                disableModal(BtnModal);
            }
        });
    }
});