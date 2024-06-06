import { Divider, Grow, Slide } from "@mui/material";
import ImageSlider from "./utils/ImageSlider";
import { Chip } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import ShareButtons from "./utils/ShareButtons";
export default function CarDetails() {
    const [chatOpened, setChatOpened] = useState(false);
    const navigate = useNavigate();
    const car = useMemo(() => JSON.parse(localStorage.getItem("currentCar")), []);
    if (!car) return <h1>Loading...</h1>;
    return (
        <>
            <div onClick={() => setChatOpened(true)} className="flexed-centered p-3" style={{ position: "fixed", width: "3em", height: "3em", bottom: "1em", right: "1em", borderRadius: "50%", backgroundColor: "green", color: "white" }}>
                <i className="bi bi-chat" />
            </div>
            <div className="p-5 flexed-centered">
                <Slide direction="right" in={true} timeout={500}>
                    <div className="col-sm-12 col-md-6">
                        <div className="flexed-centered" style={{maxWidth: 500}}>
                            <img style={{ width: "100%", height: "100%", borderRadius: "1em", boxShadow: "0px 0px 20px 0px" }} src={car.mainImage} alt={car.brand} />
                        </div>
                    </div>
                </Slide>
                <Slide in={true} timeout={500} direction="left">
                    <div className="col-md-6 col-sm-12" style={{ textAlign: "center" }}>
                        <h1><strong>{car.title}</strong> <span style={{ fontSize: "small" }}>by <strong><Link to={`/?seller=${car.seller.replace(" ", "-").toLowerCase()}`}>{car.seller}</Link></strong></span></h1>
                        <Chip onClick={() => navigate(`/?brand=${car.brand.replace(" ", "-").toLowerCase()}`)}>{car.brand}</Chip>
                        <div className="mt-5">
                            <h1><strong>${car.price.toFixed(2)}</strong></h1>
                            <Divider />
                            <p className="mt-5">{car.description}</p>
                        </div>
                    </div>
                </Slide>
            </div>
            <div className="p-5 flexed-centered" style={{ justifyContent: "space-around" }}>
                <h1>More Images</h1>
                <ImageSlider images={car.images} />
            </div>
            <ShareButtons />
            <Slide in={chatOpened} unmountOnExit direction="up" timeout={500}>
                <div style={{ display: "flex", justifyContent: "center", position: "fixed", bottom: 25, left: 0, width: "100vw", height: "75vh", zIndex: 999999999999, overflow: "hidden" }}>
                    <div className="p-3" style={{ borderRadius: "1em", position: "relative", backgroundColor: "rgb(0, 0, 0, 0.96)", width: "97%" }}>
                        <h1><i className="bi bi-x-lg" onClick={() => setChatOpened(false)} style={{ color: "white" }}></i></h1>
                        <h1 className="flexed-centered col-12 "><span style={{ color: "white" }}>Chat with {car.seller}</span></h1>
                        <div className="row flexed-centered">
                            <div
                                className=""
                                style={{
                                    textAlign: "center",
                                    paddingBottom: "2em",
                                    overflowY: "auto",
                                    height: "50vh",
                                }}
                            >
                                <div className="col-12">
                                    {[
                                        `Hello There, I want to buy your ${car.brand}, but I have some questions.`,
                                        "Greetings to you! I'm all ears",
                                        "What is the engine mileage?",
                                        "its 100 Mile only",
                                        "Okay I guess I'm buyin it!",
                                        "I can't wait to see you drive it!",
                                        "Be in touch pal!",
                                        "B N touch!"
                                    ].map((lang, index) => {
                                        const onRight = index % 2 === 1;
                                        return <Grow in={true} timeout={700 + index * 200} key={lang[0]}>
                                            <div className="col-12 mb-3" style={{ display: "flex", justifyContent: onRight && "flex-end" }}>
                                                <p className="nooverflow p-3" style={{ backgroundColor: "gray", borderRadius: onRight ? "1em 1em 0em 1em" : "1em 1em 1em 0em", color: "white", maxWidth: "50%" }}>
                                                    <span className="p-3">{lang}</span>
                                                </p>
                                            </div>
                                        </Grow>

                                    })}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    )
}