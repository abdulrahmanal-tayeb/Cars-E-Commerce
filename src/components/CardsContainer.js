export default function CardsContainer({children}) {
    return (
        <div className="row p-3" style={{marginRight: 0, display: "flex", justifyContent: "space-around", gap: "3em 1em"}}>
            {children}
        </div>
    )
}