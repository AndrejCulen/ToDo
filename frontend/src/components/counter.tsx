interface Counter {
    count: number
    text: string
}

export default function Counter({count, text}: Counter) {
    return (
        <>
            {count ?
                <div>
                    {text} {count}
                </div>
                :
                <></>
            }
            
        </>
    )
}