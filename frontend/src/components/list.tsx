import TextInput from './textInput'

interface List {
    items: [
        item: {
            id: string,
            text: string,
        }
    ]
}

export default function List(list: List) {
    console.log(list)
    return (
        <ul>
            {list.items?.map((item) => (
                <li key={item.id}>
                    <TextInput text={item.text} />
                </li>
            ))}
        </ul>
    )
} 