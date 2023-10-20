import { useState, useEffect } from 'react';  // import useEffect
import './App.css';



function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phones, setPhones] = useState([]);
    const [phoneName, setPhoneName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/contacts/')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);


    const createContact = () => {
        fetch('http://localhost:5000/api/contacts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(data => {
                setContacts([...contacts, data]);
                setName('');
            });
    };

    const deleteContact = (contactId) => {
        fetch(`http://localhost:5000/api/contacts/${contactId}`, {
            method: 'DELETE'
        })
            .then(() => {
                const updatedContacts = contacts.filter(contact => contact._id !== contactId);
                setContacts(updatedContacts);
            });
    };

    const addPhone = (contactId) => {
        fetch(`http://localhost:5000/api/contacts/${contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: phoneName, number: phoneNumber })
        })
            .then(response => response.json())
            .then(data => {
                setPhones([...phones, data]);
                setPhoneName('');
                setPhoneNumber('');
            });
    };

    const deletePhone = (phoneId) => {
        fetch(`http://localhost:5000/api/contacts/${contactId}/phones/${phoneId}`, {
            method: 'DELETE'
        })
            .then(() => {
                const updatedPhones = phones.filter(phone => phone._id !== phoneId);
                setPhones(updatedPhones);
            });
    };


    return (
        <div className="container">
            <h1>Contactor</h1>
            <h2>Contact</h2>
            <input type="text" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} className="input" />
            <br/>
            <button onClick={createContact} className="button">Create Contact</button>
            <hr />
            {contacts.map(contact => (
                <div key={contact._id} className="block">
                    <div className="contact-block">
                    <span className="contact-name">{contact.name}</span>
                    <button onClick={() => deleteContact(contact._id)} className="contact-delete">Delete</button>
                    </div>
                    <hr />
                    <div className="contact-block">
                        <input type="text" placeholder={"Name"} value={phoneName} onChange={e => setPhoneName(e.target.value)} />
                        <input type="text" placeholder={"Phone Number"} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        <button onClick={() => addPhone(contact._id)}>Add Phone</button>
                    </div>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {phones.map(phone => (
                            <tr key={phone._id}>
                                <td>{phone.name}</td>
                                <td>{phone.number}</td>
                                <td>
                                    <button onClick={() => deletePhone(phone._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}



        </div>
    );

}

export default App;