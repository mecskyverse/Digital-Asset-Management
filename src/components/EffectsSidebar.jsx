import React from 'react'

export default function SidebarItem({ name, active, handleClick }) {
    return (
        <>
            <button
                className={`sidebar-item max-h-[93vh] text-teal ${active ? 'bg-white' : 'hover:bg-cyan-300 '}`}
                onClick={handleClick}
            >
                {name}
            </button>
            <hr />
        </>
    )
}