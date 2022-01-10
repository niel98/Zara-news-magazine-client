import React, { useState } from 'react';
import axios from 'axios'
import { Form, Card, Button, } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import SpinnerLoading from './SpinnerLoading';

const Main = () => {
    const [fileName, setFileName] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

    const { title, content, category } = formData

    const onChangeFormData = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelect=(e)=>{
        console.log(e);
        setValue(e)
      }

    const onNewsUpload = async (e) => {
        if (fileName === null) {
            window.alert('image field for news content cannot be empty')
        } else {
            setIsLoading(true)
            let formData2 = new FormData()
            formData2.append('image', fileName)
            formData2.append('title', formData.title)
            formData2.append('content', formData.content)
            formData2.append('category', value)
            e.preventDefault(e)

            const config = {
                headers: {
                    'content-Type': 'application/json'
                }
            }

            const body = formData2
            console.log('data to upload: ', body)

            try {
                const res = await axios.post('https://zara-magazine-app.herokuapp.com/news/post', body, config)
                console.log('Response: ', res)
                setIsLoading(false)
                window.alert('Article uploaded successfully!')
            } catch (err) {
                setIsLoading(false)
                console.log(err.message)
            }
        }
    }

    return (
        
        <>
            { isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><SpinnerLoading /></div> : (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: 10, 
                    margin: 10, 
                    }}>
                    <Card style={{ width: '70%' }}>
                        <Card.Body>
                            <Card.Header style={{ color: 'lilac', }}>Upload New Zara News Article</Card.Header>
                        <Form encType='multipart/form-data' onSubmit={e => onNewsUpload(e)}>
                            <br></br>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Control 
                        type="file"
                        name='image'
                        onChange={e => setFileName(e.target.files[0])}
                        required
                        />
                        {console.log('file', fileName)}
                        <Form.Text className="text-muted">
                        Upload image.
                        </Form.Text>
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control 
                        type="text" 
                        placeholder="title"
                        name='title'
                        value={title}
                        onChange={e => onChangeFormData(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Control 
                        type="text" 
                        as='textarea' 
                        rows={10} 
                        placeholder="content" 
                        name='content'
                        value={content}
                        onChange={e => onChangeFormData(e)}
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="category">
                        <Form.Control 
                        type="text" 
                        placeholder="category (Zara Report or Zara Africa)"
                        name='category'
                        value={category}
                        onChange={e => onChangeFormData(e)}
                        required
                        />
                    </Form.Group> */}
                    <DropdownButton
                        alignRight
                        title={value}
                        id="dropdown-menu-align-right"
                        onSelect={handleSelect}
                            >
                        <Dropdown.Item eventKey="Zara Africa">Zara Africa</Dropdown.Item>
                        <Dropdown.Item eventKey="Zara potpourri">Zara Potpourri</Dropdown.Item>
                        <Dropdown.Item eventKey="Zara Report">Zara Report</Dropdown.Item>
                        <Dropdown.Divider />
                    </DropdownButton>
                    {console.log({ title, content, value })}
                        <br></br>
                    <Button type="submit" style={{ backgroundColor: '#C8A2C8' }}>
                        Upload news Article
                    </Button>
                    </Form>
                        </Card.Body>
                    </Card>
                    
                </div>
            )}
        
        </>
    );
}

export default Main;
