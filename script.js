document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.computer');
    const computerIdElement = document.getElementById('computer-id'); 
    const computerStatusElement = document.getElementById('computer-status');
    let selectedButton = null;

    const computerStatuses = {
        pc1: 'online',
        pc2: 'offline',
        pc3: 'error',
        pc4: 'online',
        pc5: 'offline',
    };

    const updateStatus = (id, status) => {
        const button = document.getElementById(id);
        if (!button) return;

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
            if (selectedButton) {
                selectedButton.style.stroke = 'none';
            }

            selectedButton = button;
            selectedButton.style.stroke = 'blue';
            selectedButton.style.strokeWidth = '2';

            const status = computerStatuses[button.id];
            if (status) {
                computerIdElement.textContent = button.id;
                computerStatusElement.textContent = status;
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

    // Simulate dynamic status updates
    setInterval(() => {
        const statuses = ['online', 'offline', 'error'];
        const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

        Object.keys(computerStatuses).forEach((id) => {
            const newStatus = getRandomStatus();
            computerStatuses[id] = newStatus;
            updateStatus(id, newStatus);

            // If the selected computer's status changes, update the details panel
            if (selectedButton && selectedButton.id === id) {
                computerStatusElement.textContent = newStatus;
            }
        });
    }, 5000); // Updates every 5 seconds
});
