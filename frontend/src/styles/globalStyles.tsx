import { createGlobalStyle} from "styled-components"

export const GlobalStyle = createGlobalStyle`
    #root {
        width: 100%;
    }

    body {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        font-synthesis: none;
        color-scheme: light;
        margin: 84px 0;
        display: flex;
        min-width: 320px;
        min-height: 100vh;
        width: 100%;
        color: ${props => props.theme.textColor};
        background: ${props => props.theme.backgroundColor && props.theme.backgroundColor};
    }

    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        transition: border-color 0.25s;
    }
`