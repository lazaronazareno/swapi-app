import React from "react"
import './footer.scss';

export default function Footer () {
  return (
    <footer className='footer'>
      <span className="text-copy">Star Wars and all associated names and/or images are copyright Lucasfilm Ltd.</span>
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/lazaro-vega-sanchez" className="footer-text">Linkedin</a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/lazaronazareno" className="footer-text">Github</a>
      <span>|</span>
      <a href="mailto:lazaronazareno@gmail.com?Subject=Contacto%20por%20portfolio" className="footer-text">lazaronazareno@gmail</a>
    </footer>
  )
}