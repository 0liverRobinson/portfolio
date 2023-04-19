const sections = document.getElementsByClassName("section");
const observer = new IntersectionObserver( elements => {
    elements.forEach( element => {
        try  {
            let current_title = element.target.querySelector('.section_title');
            let current_text = element.target.querySelector('.section_text');
            let contact = element.target.querySelector(".contact_class");


            if( element.isIntersecting ) {
                current_title.classList.add('dropper');
                current_text.classList.add('sweepLeft');
                contact.classList.add('riseBottom');
                return;
            }
            current_title.classList.remove('dropper');
            current_text.classList.remove('sweepLeft');
            contact.classList.remove('riseBottom');
        } catch (err) {}
    });

});

for (let i = 0; i < sections.length; i++)
    observer.observe(sections[i]);