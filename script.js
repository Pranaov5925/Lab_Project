document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.computer');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            alert(`You clicked on ${button.id}`);
            button.style.fill = 'red';
        });

        button.addEventListener('mouseenter', () => {
            button.style.fill = 'yellowgreen';
        });
        button.addEventListener('mouseleave', () => {
            button.style.fill = 'lightgreen';
        });
    });
});
