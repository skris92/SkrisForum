import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default Footer;

function Footer() {
    return (
        <div className='text-center text-white p-2' style={{ backgroundColor: '#212429' }}>
            © 2022 Skris92 Development
            <FontAwesomeIcon className="fa-icon" icon={faLinkedin} href="https://www.linkedin.com/in/kristof-szurcsik/"/>
            <FontAwesomeIcon className="fa-icon" icon={faGithub} href="https://github.com/skris92" />
            <FontAwesomeIcon className="fa-icon" icon={faDiscord} />
            <FontAwesomeIcon className="fa-icon" icon={faFacebook} />
            <span>szurcsik92@gmail.com</span>
        </div>
    );
}