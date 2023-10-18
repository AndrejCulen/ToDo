import styled from 'styled-components'

interface Dimensions {
    width: number,
    height: number
}

export default function Add({width, height}: Dimensions) {
    return (
        <SVG width={width} height={height} viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-379.000000, -240.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <polygon id="plus-[#1512]" points="344 89 344 91 334.55 91 334.55 100 332.45 100 332.45 91 323 91 323 89 332.45 89 332.45 80 334.55 80 334.55 89"></polygon>
                    </g>
                </g>
            </g>
        </SVG>
    )
}

const SVG = styled.svg`
    fill: #e4e4e4;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`