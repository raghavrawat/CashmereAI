import { useState } from 'react'
import moment from 'moment'

import Dropdown from '../Dropdown/Dropdown'
import { FIELD_NAME } from '../../constants'

import ContactsGrey from '../../images/contacts-grey.svg'
import ThumbsUp from '../../images/thumbs-up.svg'
import ThumbsDown from '../../images/thumbs-down.svg'
import ThumbsUpColor from '../../images/thumbs-up-color.svg'
import ThumbsDownColor from '../../images/thumb-down-color.svg'
import Ellipsis from '../../images/ellipsis.svg'
import Linkedin from '../../images/linkedin.svg'
import './Leads.css'

export default function Leads ({ lead, handleSelect, handleThumbs, feedbackObject }) {
    const [showDropdown, setShowDropdown] = useState(false)

    const onEllipsisClick = () => {
        setShowDropdown(!showDropdown)
    }

    const handleOnSelect = (value) => {
        handleSelect(value, lead._id)
        setShowDropdown(false);
    }

    const renderLabel = (name, value) => {
        return (
            <div className="lead-name">
                <div className="label">{name}</div>
                <div className="value">{value}</div>
            </div>
        )
    }

    const formatDate = (date) => {
        return moment(date).format('MMMM DD, YYYY');
    }

    const renderHeader = () => {
        return (
            <div className="lead-header">
                <div className="header-left">
                    <img className={lead.isContacted ? 'green' : 'grey' } src={ContactsGrey} alt="contacts-grey" onClick={() => handleSelect('contacted', lead._id)} />
                </div>
                <div className="header-right">
                    <img src={feedbackObject[lead._id] === 1 ? ThumbsUpColor : ThumbsUp} alt="thumbs-up" onClick={() => handleThumbs(feedbackObject[lead._id] === 1 ? 0 : 1, lead._id)}/>
                    <img src={feedbackObject[lead._id] === -1 ? ThumbsDownColor : ThumbsDown} alt="thumbs-down" onClick={() => handleThumbs(feedbackObject[lead._id] === -1 ? 0 : -1, lead._id)}/>
                    <Dropdown 
                        open={showDropdown}
                        setShowDropdown={setShowDropdown}
                        onSelect={handleOnSelect}
                    >
                        <img src={Ellipsis} alt="ellipsis" onClick={onEllipsisClick}/>
                    </Dropdown>
                </div>
            </div>
        )
    }

    const renderBody = () => {
        const { name, current_title, city, nwe_bucket } = lead
        return (
            <div className="lead-body">
                {renderLabel(FIELD_NAME.NAME, name)}
                <div className="lead-properties">
                    {renderLabel(FIELD_NAME.ROLE, current_title)}
                    {renderLabel(FIELD_NAME.NET_WORTH, nwe_bucket)}
                    {renderLabel(FIELD_NAME.CITY, city)}
                </div>
            </div>
        )
    }

    const redirectToLink = () => {
        window.open(lead.company_linkedin)
    }

    const renderFooter = () => {
        return (
            <div className="lead-footer">
                {renderLabel(FIELD_NAME.DATE, formatDate(lead.deal_date))}
                <div className="linkedin-icon">
                    <img src={Linkedin} alt="linkedin" onClick={redirectToLink}/>
                </div>
            </div>
        )
    }

    return (
        <div className="lead-card-container">
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </div>
    )
}