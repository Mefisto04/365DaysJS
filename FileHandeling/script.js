document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const editor = document.getElementById('editor');

    fileInput.addEventListener('change', handleFileSelect);
});
function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            document.getElementById('editor').value = content;
        };

        reader.readAsText(file);
    }
}

function saveFile() {
    const content = document.getElementById('editor').value;
    const blob = new Blob([content], { type: 'text/plain' });
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'edited_file.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
