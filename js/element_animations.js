const sections = document.getElementsByClassName("section_container");
const observer = new IntersectionObserver( elements => {
    elements.forEach( element => {
        try  {

            let current_title = element.target.querySelector('.heading');
            let current_content = element.target.querySelector('.part_b');

            if( element.isIntersecting && (window.pageYOffset < element.target.clientTop + element.target.clientHeight)) 
            {
                current_title.classList.add('dropDown');
                current_content.classList.add('riseUp');
                return;
            }

            current_title.classList.remove('dropDown');
            current_content.classList.remove('riseUp');

        } catch (err) 
        {   
        }
    });

});
for (let i = 0; i < sections.length; i++)
    observer.observe(sections[i]);