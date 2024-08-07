document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const modules = document.querySelectorAll('.module-content ul li a');
    const totalModules = modules.length;
    let completedModules = JSON.parse(sessionStorage.getItem('completedModules')) || [];

    function updateProgressBar() {
        const progress = (completedModules.length / totalModules) * 100;
        progressBar.value = progress;
    }

    modules.forEach(module => {
        module.addEventListener('click', function(event) {
            const moduleHref = this.href;
            if (!completedModules.includes(moduleHref)) {
                completedModules.push(moduleHref);
                sessionStorage.setItem('completedModules', JSON.stringify(completedModules));
            }
            updateProgressBar();
        });
    });

    updateProgressBar();

    document.querySelectorAll('.toggle-content').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const contentId = toggle.getAttribute('data-target');
            const content = document.getElementById(contentId);
            if (content.style.display === 'block') {
                content.style.display = 'none';
                toggle.textContent = '+';
            } else {
                content.style.display = 'block';
                toggle.textContent = '-';
            }
        });
    });
});

