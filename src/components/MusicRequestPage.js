import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const MusicRequestPage = () => {
    return (
        <Container className={"container-with-pattern font-monospace"}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Ide irhatod be a dalt amit szeretnél hallani:</Form.Label>
                    <Form.Control as="textarea" rows={3}/>
                </Form.Group>
                <Button>Küldés</Button>
                <Button>
                    <Link className={"text-decoration-none text-black"} to={"/"}>
                        Vissza
                    </Link>
                </Button>
            </Form>
        </Container>
    )
}
export default MusicRequestPage;