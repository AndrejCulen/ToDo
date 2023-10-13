import React from 'react'

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
                <li>{item.text}</li>
            ))}
        </ul>
    )
} 