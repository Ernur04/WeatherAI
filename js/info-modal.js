// Info Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const infoModal = document.getElementById('info-modal');
    const btnOpenInfo = document.getElementById('info-toggle');
    const btnCloseInfo = document.getElementById('close-info-modal');

    // Make sure we have the required generic modal CSS from 'ai-modal.css' loaded, 
    // we reuse its overlay logic. If ai-modal.css handles basic 'active' opacity/visibility, we just toggle '.active'

    if (btnOpenInfo && infoModal && btnCloseInfo) {
        btnOpenInfo.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent document click handling closing this instantly if we have global handlers
            infoModal.style.display = 'flex'; // Use flex for centering if it's the standard modal
        });

        btnCloseInfo.addEventListener('click', () => {
            infoModal.style.display = 'none';
        });

        // Close when clicking outside of the modal container
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.style.display = 'none';
            }
        });
        
        // Setup ESC key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && infoModal.style.display === 'flex') {
                infoModal.style.display = 'none';
            }
        });
    }
});
