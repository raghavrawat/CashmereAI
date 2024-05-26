import { useRef } from 'react'

import ContactsGrey from '../../images/contacts-grey.svg'
import Delete from '../../images/delete.svg'
import useClickOutside from '../../hooks/useClickOutside'

import './Dropdown.css'

export default function Dropdown ({ children, open, onSelect, setShowDropdown }) {

    const dropdownContainerRef = useRef(null);

    useClickOutside(dropdownContainerRef, () => {
        setShowDropdown(false);
    });

    const renderMenuItem = (text, img, value) => {
        return (
            <div className="menu-item" onClick={() => onSelect(value)}>
                <span>{text}</span>
                <img src={img} alt={value} />
            </div> 
        )
    }

    const renderDropdownContent = () => {
        return (
            <div className="menu-content">
                {renderMenuItem('Mark as contacted', ContactsGrey, 'contacted')}
                {renderMenuItem('Delete', Delete, 'delete')}
            </div>
        )
    }

    return (
        <div className="dropdown-container" ref={dropdownContainerRef}>
            {children}
            {open && renderDropdownContent()}
        </div>
    )
}