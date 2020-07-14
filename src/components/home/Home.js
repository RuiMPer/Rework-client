import React from 'react';
import './Home.css';
import { Jumbotron, Button, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

function Home(props){
    return(
        <section className="home">

            <h1>Welcome to Re-work!</h1>


            {props.isLoggedIn &&
                <>
                    <h3>Todos os Serviços da Empresa X</h3>
                    <h3>Calendário da Empresa X</h3>
                    <h3>Clientes da Empresa X</h3>
                </>
            }


            <h3>About us</h3>
            <Jumbotron>
                <h1 className="display-3">Um detaque sobre serviços ou categorias....</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>

            <h3>All our categories</h3>
            <Card inverse className="category-card">
                <CardImg width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                <CardImgOverlay>
                <CardTitle>TÍTULO GOES HERE</CardTitle>
                <CardText>
                    <small>Know more +</small>
                </CardText>
                </CardImgOverlay>
            </Card>
        </section>
    )
}
export default Home;