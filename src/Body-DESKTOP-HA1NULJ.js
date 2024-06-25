import './Body.css';




export function Buffer()
{
  return (
    <div className="buffer">
    </div>
  );
}


export function About() {
  return (
    <div className="body-section">


      <header id="about" className="body-header" >
        About
      </header>

      <div className='terminal-window'>
        <div className='title-bar'>
          
          <div className='buttons'>          
            
            <div className='minimise'></div>
            <div className='divider'></div>
            <div className='full'></div>
            <div className='divider'></div>
            <div className='exit'></div>

          </div>


        </div>
        <div className='terminal-content'>

          <div className='input-line'>
          oliver@portfolio:<div className='current-dir'>/about/me</div>
          </div>
          $ Who are you?

          <div className='response-line'>
            I'm Oliver, a software developer hailing from Suffolk, England; who has a keen interest in cyber security and artificial intelligence.
          </div>

          <br></br>
          <div className='input-line'>
          oliver@portfolio:<div className='current-dir'>/about/me</div>
          </div>
          $ What do you specialise in?
          <div className='response-line'>
            I specialise in machine learning, cybersecurity and web development.  
          </div>

          <br></br>
          <div className='input-line'>
          oliver@portfolio:<div className='current-dir'>/about/me</div>
          </div>

          $ What languages can you program in?
          <div className='response-line'>
            Python, C, C++, Java, JavaScript (vanilla, nodeJS, react), Erlang, Bash, PHP, SQL and Ruby.
          </div>

          <br></br>
          <div className='input-line'>
          oliver@portfolio:<div className='current-dir'>/about/me</div>
          </div>
          $ What experience do you have ?
          

          <div className='response-line'>
            I worked as a teaching lab assistant at Lancaster University.
          </div>

          <br></br>

          <div className='input-line'>
          oliver@portfolio:<div className='current-dir'>/about/me</div>
          </div>
          $ What languages can you speak?
          <div className='response-line'>
            English and Japanese.
          </div>
          <br></br>
          <div className='input-line'>
          oliver@portfolio:<div className='current-dir'>/about/me</div>
          </div>
          $
          <div className="animated-caret"></div>


        </div>

      </div>

    </div>
  );
}

export function Projects() {
  return (
    <div className="body-section">


      <header  id="projects" className="body-header">
      Projects
      </header>

      <div className="window">

        <div className="tabs">
            
          <div className='buttons'>          
              
              <div className='minimise'></div>
              <div className='divider'></div>
              <div className='full'></div>
              <div className='divider'></div>
              <div className='exit'></div>

          </div>

        </div>

        <div className="url">

          <div className="tab active-tab">
            Traffic monitor
            </div>

            <div className="tab inactive-tab">
            Path finder
            </div>

            <div className="tab inactive-tab">
            Path finder
            </div>


            <div className="tab">

          </div>
        </div>

        <div id="1" className="content active-content">
          <div className='linecount'>

          </div>

          <div className='text-area'>

              <div className="project-title"># Project title: Sniffo - The minimalist packet sniffer</div>
              # Language: Python  <br></br>
              # URL: <a href='https://github.com/0liverRobinson/Sniffo'>https://github.com/0liverRobinson/Sniffo</a>  <br></br>
              # License: MIT  <br></br>
              # Status: Stable  <br></br>
              # Description:  <br></br>

          </div>

        </div>

        <div  id="2" className="content inactive-content">
          <div className='linecount'>

          </div>

          <div className='text-area'>

            <div className="project-title"># Project title: Sniffo - The minimalist packet sniffer</div>


          </div>


        </div>

        <div  id="3" className="content inactive_content">
          <div className='linecount'>

          </div>
          <div className='text-area'>

            <div className="project-title"># Project title: Sniffo - The minimalist packet sniffer</div>


          </div>


        </div>

      </div>




    </div>
  );
}


export function Certificates()
{
  return (
    <div className="body-section">


      <header  id="certificates" className="body-header">
      Certificates

      It is a file explorerer layout, showing all certificates using a retro file icon.
      On selection, brings up notepad , can close and carry on.
      </header>
    </div>
  );
}


export function Contact() {
  return (
    <div className="body-section">

      <header  id="contact" className="body-header">
        Contact

        Designed after an actual email window, with the CC button and everything.
        The three inputs, the receiving email etc...

        <form id="email_form" action="https://formspree.io/f/xwkjaply" method="POST">
          <div classname="text part_b">
              <input type="email" name="" value="Oliver@gmail.com" readonly ></input>

              <input type="email" name="email" placeholder="Email"></input>
              <br></br>

              <textarea name="message" placeholder="Message..."></textarea>
              <br></br>

              <button type="submit">Send</button>
          </div>
        </form>

      </header>
    </div>
  );
}
