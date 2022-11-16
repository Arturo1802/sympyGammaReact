
import axios from 'axios';
import React, { useState } from 'react';
import Latex from 'react-latex-next';
import {
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Input,
    Button,
    Container
} from 'reactstrap';
const Integrales = () => {
    const [response, setResponse] = useState({})
    const submitForm = async(variable) => {
        await console.log(axios.post(`http://localhost:3333/integrate/`, { id: `${variable}`, expression: `${variable}` }).then((res) => { setResponse(res.data) }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { derivateinput } = e.target.elements
        let prov = derivateinput.value
        submitForm(prov)
    }


    return (
        <AccordionItem>
            <AccordionHeader targetId='2'>
                Integrales
            </AccordionHeader>
            <AccordionBody accordionId='2'>
                <form onSubmit={handleSubmit}>
                    <Input autocomplete="off"
                        id='derivateinput'
                        name='derivateinput'
                        required
                        placeholder='Ingresa la integral que deseas resolver' />
                    <br />
                    <Button color="primary">
                        Resolver
                    </Button>
                </form>
                <br />
                <Container className='border bg-secondary ' style={{ margin: 'auto',padding:10 }}>
                    {
                        response.result ? <Latex  style={{}}>{`$ ${response.result} $`}</Latex> : <div> </div>
                    }

                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}

export default Integrales