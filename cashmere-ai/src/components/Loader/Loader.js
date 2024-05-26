import { useMemo } from "react"
import { FIELD_NAME } from "../../constants"
import Contacts from '../../images/contacts-grey.svg'
import ThumbsUp from '../../images/thumbs-up.svg'
import ThumbsDown from '../../images/thumbs-down.svg'
import Ellipsis from '../../images/ellipsis.svg'
import Linkedin from '../../images/linkedin.svg'

import './Loader.css'

export default function Loader () {

    const loaderCard = useMemo(() => {
        return new Array(9).fill(0)
    }, [])

    const renderPlaceholderHeader = () => {
        return (
            <div className="placeholder-header">
                <div className="header-left">
                    <img src={Contacts} alt="contacts-grey" />
                </div>
                <div className="header-right">
                    <img src={ThumbsUp} alt="thumbs-up" />
                    <img src={ThumbsDown} alt="thumbs-down" />
                    <img src={Ellipsis} alt="ellipsis" />
                </div>
            </div>
        )
    }

    const renderLabel = (text) => {
        return (
            <div className="placeholder-label">
                <div className="field-label">{text}</div>
                <div className="field-value shimmerBG"></div>
            </div>
        )
    }

    const renderPlaceholderBody = () => {
        return (
            <div className="placeholder-body">
                {renderLabel(FIELD_NAME.NAME)}
                <div className="lead-properties">
                    {renderLabel(FIELD_NAME.ROLE)}
                    {renderLabel(FIELD_NAME.NET_WORTH)}
                    {renderLabel(FIELD_NAME.CITY)}
                </div>
            </div>
        )
    }

    const renderPlaceholderFooter = () => {
        return (
            <div className="placeholder-footer">
                {renderLabel(FIELD_NAME.DATE)}
                <div className="linkedin-icon">
                    <img src={Linkedin} alt="linkedin" />
                </div>
            </div>
        )
    }

    return (
        <div className="loader-container">
            {
                loaderCard.map((_, index) => {
                    return (
                        <div key={index} className="placeholder-container">
                            {renderPlaceholderHeader()}
                            {renderPlaceholderBody()}
                            {renderPlaceholderFooter()}
                        </div>
                    )
                })
            }
        </div>
    )
}