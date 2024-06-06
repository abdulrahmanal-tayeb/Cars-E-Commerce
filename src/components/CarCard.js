import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Slide } from '@mui/material';
import { Divider, Chip } from '@mui/joy';
import { forwardRef } from 'react';
const CarCard = forwardRef(
    ({ item }, ref) => {
        const {
            title,
            brand,
            price,
            model,
            state,
            mainImage,
        } = item;

        const handleDetails = () => {
            try {
                localStorage.setItem("currentCar", JSON.stringify(item));
                window.open("/car/", "_blank");
            } catch (e) {
                console.log(e);
            }
        }

        return (
            <Card sx={{ width: "clamp(250px, 33%, 400px)", padding: "1em", boxShadow: "0px 0px 10px 0px", overflow: 'hidden' }}>

                <div ref={ref}>
                    <Typography level="title-lg">{title}</Typography>
                    <Typography level="body-sm">Model: {model}</Typography>
                </div>

                <AspectRatio minHeight="120px" maxHeight="200px">
                    <Slide in={true} timeout={700} direction="up">
                        <img
                            src={mainImage}
                            loading="lazy"
                            alt=""
                        />
                    </Slide>
                </AspectRatio>
                {<IconButton
                    title='Car State'
                    variant="plain"
                    color="neutral"
                    size="lg"
                    sx={state === "New"? {backgroundColor:  "green", color: "white"} : {backgroundColor: "yellow", color: "black"}}
                >
                    <span>{state}</span>
                </IconButton>}
                <div>
                    <Divider sx={{ margin: "1em 0em 1em 0em" }} />
                    <Chip
                        color="primary"
                        size="lg"
                        variant="outlined"
                    >{brand}</Chip>
                </div>

                <CardContent orientation="horizontal">
                    <div style={{ flexGrow: 1 }}>
                        <Typography level="body-xs">Price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg" sx={{ width: "100%" }}>
                            <span>${price}</span>
                        </Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em"
                    }}>

                        <Button
                            variant="solid"
                            size="md"
                            color="primary"
                            aria-label={title}
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                            onClick={handleDetails}
                        >
                            Explore
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
);
export default CarCard;