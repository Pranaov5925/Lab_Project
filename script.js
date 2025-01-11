document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.computer');
    const computerIdElement = document.getElementById('computer-id'); 
    const computerStatusElement = document.getElementById('computer-status');
    let selectedButton = null; // Track the currently selected button

    // Ensure the computer details elements exist
    if (!computerIdElement || !computerStatusElement) {
        console.error('Missing computer details elements in the HTML.');
        return;
    }

    // Define the statuses for computers
    const computerStatuses = {
        pc1: 'online',
        pc2: 'offline',
        pc3: 'error',
        pc4: 'online',
        pc5: 'offline',
    };

    // Update the status color for a computer
    const updateStatus = (id, status) => {
        const button = document.getElementById(id);
        if (!button) {
            console.error(`Button with id "${id}" not found.`);
            return;
        }

        if (status === 'online') {
            button.style.fill = 'lightgreen';
        } else if (status === 'offline') {
            button.style.fill = 'red';
        } else if (status === 'error') {
            button.style.fill = 'yellow';
        }
    };

    // Apply initial statuses
    Object.keys(computerStatuses).forEach((id) => {
        updateStatus(id, computerStatuses[id]);
    });

    // Handle computer click events
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Deselect the previously selected button
            if (selectedButton) {
                selectedButton.style.stroke = 'none';
            }

            // Highlight the selected button
            selectedButton = button;
            selectedButton.style.stroke = 'blue';
            selectedButton.style.strokeWidth = '2';

            // Update the computer details section
            const status = computerStatuses[button.id];
            if (status) {
                computerIdElement.textContent = button.id;
                computerStatusElement.textContent = status;
            } else {
                console.error(`Status for "${button.id}" not found.`);
            }
        });
    });

    // Add tooltips for hover
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    buttons.forEach((button) => {
        button.addEventListener('mouseenter', (e) => {
            const status = computerStatuses[button.id];
            tooltip.textContent = `${button.id} - ${status}`;
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        });

        button.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
});
