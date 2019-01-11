import React from 'react';

const Footer = (props) => {
    return (
        <footer>
            <blockquote>
                <footer>
                    MadLib stories from <cite><i>{props.title}</i> by {props.author} - {props.publisher} {props.published}</cite>.
                </footer>
            </blockquote>
            
        </footer>
    )
}

export default Footer;