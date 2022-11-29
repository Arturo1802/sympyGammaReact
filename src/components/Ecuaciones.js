
import axios from 'axios';
import React, { useState } from 'react';
import Latex from 'react-latex-next';
import {
    AccordionBody,
    AccordionHeader,
    AccordionItem, Form,
    Button,
    Input,
    Container
} from 'reactstrap';
const Ecuaciones = () => {
    const [response, setResponse] = useState({})
    const submitForm = async(variable) => {
        await console.log(axios.post(`http://localhost:8000/integrate/`, { id: `${variable}`, expression: `${variable}` }).then((res) => { setResponse(res.data) }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { derivateinput } = e.target.elements
        let prov = derivateinput.value
        submitForm(prov)
    }
    return (
        <AccordionItem>
            <AccordionHeader targetId='3'>
                Ecuaciones Diferenciales
            </AccordionHeader>
            <AccordionBody accordionId='3'>
                <Form onSubmit={handleSubmit}>
                    <Input autocomplete="off" name='equation'
                        required
                        placeholder='Ingresa la ecuacion que deseas resolver' />
                    <br />
                    <Button color="primary">
                        Resolver
                    </Button>
                </Form>
                <br />
                <Container className='border bg-secondary ' style={{ margin: 'auto', padding: 5 }}>
                    {
                        response.result ? <Latex style={{fontSize:40}} >{`$ ${response.result} $`}</Latex> : <div></div>
                    }
                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}

export default Ecuaciones