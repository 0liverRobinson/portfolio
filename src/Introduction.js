import React from "react";
import './index.css';
import './introduction.css';


const Introduction = () => {


    return (

        <div className="introduction" style={{position: 'absolute',  zIndex: -1,}} >

            <div className="text">
                Hello<br></br>
                I'm <div className="green">Oliver</div>
                <div className="subtext">
                I'm a web developer and ethical hacker. 
                </div>
            </div>

            <div className="picture">
                <img className="picture-img" src={require('./me.jpg')} />
            </div>

        </div>


    )

};



export default Introduction;