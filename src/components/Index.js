import { useCallback, useEffect, useMemo, useState } from "react";
import carsDataList from "../cars.json";
import CardsContainer from "./CardsContainer";
import Input from '@mui/joy/Input';
import { Skeleton } from "@mui/material";
import _debounce from "lodash/debounce"
import CarCard from "./CarCard";
import TypedText from "./utils/TypedText";
export default function Index() {
    const [isFiltering, setIsFiltering] = useState(false);
    const [filters, setFilters] = useState(null);
    const [cars, setCars] = useState(null);
    const carBrands = useMemo(() => Array.from(new Set(carsDataList.cars.map(car => car.brand))), []);
    const carModels = useMemo(() => Array.from(new Set(carsDataList.cars.map(car => car.model))), []);

    const getCars = useCallback(_debounce((cars, searchTerm) => {
        markIsFiltering(true);
        let filteredCars = carsDataList.cars;
        if (window.location.search) {
            const params = Array.from(new URLSearchParams(window.location.search)).filter(param => ["seller", "brand"].includes(param[0]));
            params.forEach(([field, value]) => {
                filteredCars = filteredCars.filter(car => car[field].toLowerCase().includes(value.replace("-", " ").toLowerCase()))
            });
        }
        if (filters) {
            const filterKeys = Object.keys(filters).filter(key => filters[key] != -1)
            filterKeys.filter(key => filters[key]).forEach(key => (
                filteredCars = filteredCars.filter(car => {
                    return !filters[key] || car[key] == filters[key]
                })
            ));
        }

        if (searchTerm) {
            filteredCars = filteredCars.filter(car => car.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setCars(filteredCars);
        markIsFiltering(false);
    }, 300), [filters]);

    useEffect(() => {
        getCars();
    }, [filters]);

    const markIsFiltering = (value) => setIsFiltering(value);

    return (
        <>
            <div className="flexed-centered" style={{
                width: "100vw", height: "90vh", background: "linear-gradient(180deg, rgb(52, 167, 213), transparent)",
                flexDirection: "column", color: "white"
            }}>
                <h1>
                    <TypedText text={"Cars Online"}>
                        {(ref) => <strong ref={ref}></strong>}
                    </TypedText>
                </h1>
                <div style={{ marginTop: "2em", flexDirection: "column", maxWidth: "90vw" }} className="flexed-centered">
                    <div style={{ maxWidth: 500 }}>
                        <Input
                            placeholder="Search for Cars..."
                            sx={{
                                '&::before': {
                                    display: 'none',
                                },
                                '&:focus-within': {
                                    outline: '2px solid var(--Input-focusedHighlight)',
                                    outlineOffset: '2px',
                                },
                            }}
                            onChange={({ target: { value } }) => getCars(cars, value)}
                        />
                    </div>
                    <div className="flexed-centered">
                        <select className="form-select" onChange={({ target: { value } }) => setFilters(prev => ({ ...filters, state: value }))}>
                            <option value={-1}>State</option>
                            <option value="New">New</option>
                            <option value="Impacted">Impacted</option>
                        </select>
                        <select className="form-select" onChange={({ target: { value } }) => setFilters(prev => ({ ...filters, brand: value }))}>
                            <option value={-1}>Brand</option>
                            {[carBrands.map((brand, index) => (
                                <option value={brand} key={index}>{brand}</option>
                            ))]}
                        </select>
                        <select className="form-select" onChange={({ target: { value } }) => setFilters(prev => ({ ...filters, model: value }))}>
                            <option value={-1}>Model</option>
                            {[carModels.map((model, index) => (
                                <option value={model} key={index}>{model}</option>
                            ))]}
                        </select>
                    </div>
                </div>
            </div>
            <CardsContainer>
                <h1 className="col-12 mb-5" style={{ textAlign: "center" }}>{filters || window.location.search ? "Filtered" : "All"} Cars</h1>
                {!isFiltering && cars && cars.length > 0 ?
                    cars.map((item, index) => <CarCard key={index} item={item} />)
                    :
                    isFiltering ?
                        new Array(5).fill(null).map((_, index) => (
                            <Skeleton key={index} variant={"rounded"} sx={{ width: "clamp(200px, 33%, 400px)", height: 350 }} />
                        ))
                        :
                        <div className="flexed-centered">
                            <h1>No Results Found</h1>
                        </div>
                }
            </CardsContainer>
        </>
    );
}
