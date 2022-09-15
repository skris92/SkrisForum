import { Button, Card, Form } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";

function Profile() {
    const { auth } = useAuth();

    const usernameRef = useRef();
    const emailRef = useRef();
    const usernameUpdateButtonRef = useRef();
    const emailUpdateButtonRef = useRef();

    const [emailAddress, setEmailAddress] = useState(auth.emailAddress);
    const [username, setUsername] = useState(auth.username);
    const [usernameInputInactive, setUsernameInputInactive] = useState(true);
    const [emailInputInactive, setEmailInputInactive] = useState(true);

    useEffect(() => {
        if (!usernameInputInactive) {
            usernameRef.current.setSelectionRange(auth.username.length, auth.username.length);
            usernameRef.current.focus();
        } else if (!emailInputInactive) {
            // emailRef.current.setSelectionRange(auth.emailAddress.length, auth.emailAddress.length);
            emailRef.current.focus();
        }
    }, [usernameInputInactive, emailInputInactive, auth]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("keydown", handleHitEscape);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("keydown", handleHitEscape);
        }
    });

    function handleHitEscape(e) {
        if (e.key !== "Escape" || (usernameInputInactive && emailInputInactive)) {
            return;
        } else if (e.key === "Escape" && !usernameInputInactive) {
            setUsername(auth.username);
            setUsernameInputInactive(true);
        } else if (e.key === "Escape" && !emailInputInactive) {
            setEmailAddress(auth.emailAddress);
            setEmailInputInactive(true);
        }
    }

    function handleClickOutside(e) {
        if (usernameInputInactive && emailInputInactive) {
            return;
        } else if (!usernameInputInactive && !usernameRef.current.contains(e.target) && !usernameUpdateButtonRef.current?.contains(e.target)) {
            setUsername(auth.username);
            setUsernameInputInactive(true);
        } else if (!emailInputInactive && !emailRef.current.contains(e.target) && !emailUpdateButtonRef?.current?.contains(e.target)) {
            setEmailAddress(auth.emailAddress);
            setEmailInputInactive(true);
        }
    }

    return (
        <Card className="profile-card">
            <Card.Header>
                <h2>Personal information</h2>
            </Card.Header>
            <Card.Body>
                <div className="profile-card-content">
                    <div className="profile-data">
                        <div className="profile-data-field">
                            <Form>
                                <h5>Username</h5>
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    placeholder={auth.username}
                                    disabled={usernameInputInactive}
                                    ref={usernameRef}
                                    minLength="2"
                                    required
                                />
                                {!usernameInputInactive &&
                                    <div className="profile-data-field-buttons">
                                        <Button
                                            type="submit"
                                            disabled={username === auth.username || username.length < 2}
                                            ref={usernameUpdateButtonRef}
                                            onClick={() => {
                                                
                                            }}
                                        >
                                            Update (Esc to cancel)
                                        </Button>
                                    </div>}
                            </Form>
                            {usernameInputInactive &&
                                <Button
                                    variant="dark"
                                    onClick={() => setUsernameInputInactive(false)}
                                >
                                    Edit
                                </Button>}
                            <br />
                        </div>
                        <div className="profile-data-field">
                            <Form>
                                <h5>Email</h5>
                                <Form.Control
                                    type="email"
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    value={emailAddress}
                                    placeholder={auth.emailAddress}
                                    disabled={emailInputInactive}
                                    ref={emailRef}
                                    required
                                />
                                {!emailInputInactive &&
                                    <div className="profile-data-field-buttons">
                                        <Button
                                            type="submit"
                                            disabled={emailAddress === auth.emailAddress || emailAddress === ""}
                                            ref={emailUpdateButtonRef}
                                            onClick={() => {

                                            }}
                                        >
                                            Update (Esc to cancel)
                                        </Button>
                                    </div>}
                            </Form>
                            {emailInputInactive &&
                                <Button
                                    variant="dark"
                                    onClick={() => setEmailInputInactive(false)}
                                >
                                    Edit
                                </Button>}
                            <br />
                        </div>
                        <p>Owned topics - 0</p>
                        <p>Comments - 0</p>
                    </div>
                    <div className="profile-description">
                        <Card className="profile-description-card">
                            <Card.Body>
                                <h4>Description</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas velit ac mauris malesuada egestas. Suspendisse risus nulla, tempor vitae nisi id, volutpat ornare nunc. Etiam eget dapibus nisl. Nullam eget erat ac quam consequat fermentum. Vestibulum varius lacinia enim, ut pulvinar quam porttitor eget. Praesent pretium dui odio, ut gravida magna pellentesque ac. Aliquam ac lacus condimentum, ultrices arcu eu, efficitur nibh. Fusce vitae lacus quis sem rutrum imperdiet sed ut orci. Cras consequat congue quam et tincidunt. Aliquam et efficitur magna, vel aliquet eros. Aliquam dignissim laoreet diam id faucibus. Aliquam erat volutpat. Ut vel enim eget sem mollis vestibulum. Proin at tincidunt mauris, in elementum velit. Vestibulum vel odio pulvinar, gravida nunc sed, tempor tellus. Curabitur feugiat sit amet mauris quis sollicitudin.</p>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Profile;