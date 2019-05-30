let readmeContent = 'Loading...';

function preload() {
    loadStrings('README.md', (markedContent) => {
        readmeContent = markedContent.reduce((all, curr) => all + curr + '\n');
        console.log(readmeContent);
    });
}

function setup() {
    document.getElementById('content').innerHTML = marked(readmeContent);
}
