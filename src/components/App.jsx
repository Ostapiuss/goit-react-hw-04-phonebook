import { useState, useEffect } from "react";

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import { nanoid } from "nanoid";

const LOCAL_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storageContacts = JSON.parse(localStorage.getItem(LOCAL_KEY));

    if (storageContacts) {
      setContacts([...storageContacts])
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts])

  const isTheSameNameInCollection = (name) => {
    return contacts.some((contact) => {
      return contact.name.slice(0, contact.name.includes(' ') ? contact.name.indexOf(' ') : contact.name.length).toLowerCase() === name.toLowerCase().trim();
    });
  }

  const addContact = (newContact) => {
    if (newContact.name.length <= 0) {
      alert(`The length should me greater than 0 symbols`);
      return null;
    }

    if (isTheSameNameInCollection(newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return null;
    }

    const newContacts = {
      name: newContact.name,
      number: newContact.number,
      id: nanoid()
    }
    setContacts(() => ([...contacts, newContacts]));
  }

  const onChangeFilter = (event) => {
    const { value: newSearchValue } = event.target;
    setFilter(() => (newSearchValue));
  }

  const onFilterContacts = (filter) => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }

  const onDeleteContact = (id) => {
    setContacts(() => (contacts.filter((contact) => contact.id !== id)));
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <div className="root-app__phonebook phonebook">
        <div className="phonebook__form">
          <h2 className="phonebook__title">Phonebook</h2>
          <ContactForm onAddContact={addContact} />
        </div>
        <h2 className="phonebook__title">Contacts</h2>
        <Filter onChangeFilter={onChangeFilter} />
        <ContactList contacts={onFilterContacts(filter)} onDeleteContact={onDeleteContact} />
      </div>
    </div>
  );
};
