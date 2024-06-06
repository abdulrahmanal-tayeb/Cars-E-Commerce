import { FacebookShare, WhatsappShare, TwitterShare, EmailShare, InstapaperShare, TelegramShare } from "react-share-kit"
export default function ShareButtons(quote){
    return (
        <>
        <h3 style={{textAlign: "center"}}>Share Offer</h3>
        <div className="flexed-centered mt-3">
            {[FacebookShare, TwitterShare, WhatsappShare, EmailShare, InstapaperShare, TelegramShare].map((Service, index) => (
                <Service key={index} url={window.location.href} quote={quote ?? "Checkout this brilliant offer!"}/>
            ))}
        </div>
        </>
    )
}