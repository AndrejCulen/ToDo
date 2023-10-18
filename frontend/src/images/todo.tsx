import styled from 'styled-components'

interface Dimensions {
    width: number,
    height: number
}

export default function TodoIcon({width, height}: Dimensions) {
    return (
        <SVG version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
            width={width} height={height} viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
            <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "/>
            <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="55" y1="11" x2="63" y2="11"/>
            <polyline fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8 "/>
            <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5 
                "/>
        </SVG>
    )
}

const SVG = styled.svg`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`