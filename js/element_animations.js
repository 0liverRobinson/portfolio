const sections = document.getElementsByClassName("section_container");
const observer = new IntersectionObserver( elements => 
{
    elements.forEach( element => 
    {
        try  
        {
            let current_title = element.target.querySelector('.heading');
            let current_content = element.target.querySelector('.part_b');
         
            if( element.isIntersecting) 
            {
                current_title.classList.add('swipeRight');
                current_content.classList.add('swipeLeft');
                return;
            }

            current_title.classList.remove('swipeRight');
            current_content.classList.remove('swipeLeft');

        } catch (err) 
        {   
        }
    });

});
for (let i = 0; i < sections.length; i++)
    observer.observe(sections[i]);