const title = document.getElementsByTagName("title")[0];
let title_content = "Oliver's Portfolio-------------------".split("");
let interval = 100;

title.innerHTML = title_content.join("");

setInterval(() => {
    
    title_content.unshift(title_content.pop());
    title.innerHTML = title_content.join("");

}, interval);