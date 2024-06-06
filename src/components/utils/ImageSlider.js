import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ImageSlider({ images }) {
    return (
        <Carousel style={{ width: "clamp(200px, 50%, 500px)", height: 350 }}>
            {images.map((image, index) => (
                <Carousel.Item key={index} interval={1500} style={{ maxHeight: "100%" }}>
                    <img
                        style={{ maxHeight: 350, overflow: "hidden"}}
                        
                        className="d-block w-100"
                        src={image}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

