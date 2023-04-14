const sections = document.getElementsByClassName("section");
const top = document.getElementById("");
const observer = new IntersectionObserver( elements => {
    elements.forEach( element => {
        
        let current_title = element.target.querySelector('.section_title');
        let current_text = element.target.querySelector('.section_text');

        if( element.isIntersecting ) {
            current_title.classList.add('dropper');
            current_text.classList.add('sweepLeft');
            return;
        }
        current_title.classList.remove('dropper');
        current_text.classList.remove('sweepLeft');
    });

});

for (let i = 0; i < sections.length; i++)
    observer.observe(sections[i]);

const top_observer = new IntersectionObserver( elements => {
    elements.forEach( element => {
        if( element.isIntersecting ) {
            
            return;
        }

    });

});