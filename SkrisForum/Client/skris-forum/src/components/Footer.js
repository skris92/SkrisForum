import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default Footer;

function Footer() {
    return (
        <div className='text-center text-white p-3' style={{ backgroundColor: '#28242c' }}>
            © 2022 Skris92 Development
            <FontAwesomeIcon className="fa-icon" icon={faLinkedin} />
            <FontAwesomeIcon className="fa-icon" icon={faGithub} />
            <FontAwesomeIcon className="fa-icon" icon={faDiscord} />
            <FontAwesomeIcon className="fa-icon" icon={faFacebook} />
        </div>
    );
}