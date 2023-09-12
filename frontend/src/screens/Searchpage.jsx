import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Snackbar } from '@mui/material';

export const Searchpage = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [noData, setNoData] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search/shows?q=${query}`)
            const responseData = await response.json();

            setData(responseData);
            if (data.length === 0) {
                setNoData(true);
                setOpenSnackbar(false);
            } else {
                setData(data);
                setNoData(false);
                setOpenSnackbar(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <div className='searchcontainer'>
                <h2 className='serchheader'>Search TV Show</h2>
                <TextField
                    label="Search TV tvShows"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ m: "10px" }}
                        onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>
            {noData && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message="No results found"
                />
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data.map((tvshow) => (
                    <Card key={tvshow.show.id} style={{ width: 300, margin: 16 }}>
                        <CardContent>
                            <img src={tvshow.show.image.original} alt={tvshow.show.name} style={{ maxWidth: '100%' }} />
                            <h3>{tvshow.show.name}</h3>
                            <p>{tvshow.show.summary}</p>
                            <p>Type: {tvshow.show.type}</p>
                            <p>Language: {tvshow.show.language}</p>
                            <p>Genres: {tvshow.show.genres.join(", ")}</p>
                            <p>Status: {tvshow.show.status}</p>
                            <p>Schedule: {tvshow.show.schedule.days.join(", ")}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
