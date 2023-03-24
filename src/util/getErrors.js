export default function getErrors(){
    let errors = 0;
    let spans = document.querySelectorAll('span');
    spans.forEach((span) => {
        if (span.classList.contains('text-red-500')){
            errors++;
        }
    })
    return errors;
}