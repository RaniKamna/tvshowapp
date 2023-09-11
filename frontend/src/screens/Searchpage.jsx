import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Snackbar } from '@mui/material';

export const Searchpage = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [noData, setNoData] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const responseData = await response.json();

            setData(responseData);

            console.log(data)
            if (data.length === 0) {
                setNoData(true);
                setOpenSnackbar(true);
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
                    <Card key={tvshow.id} style={{ width: 300, margin: 16 }}>
                        <CardContent>
                            <img src={tvshow.poster} alt={tvshow.name} style={{ maxWidth: '100%' }} />
                            <h3>{tvshow.name}</h3>
                            <p>{tvshow.summary}</p>
                            <p>Type: {tvshow.type}</p>
                            <p>Language: {tvshow.language}</p>
                            <p>Genres: {tvshow.genres.join(', ')}</p>
                            <p>Status: {tvshow.status}</p>
                            <p>Schedule: {tvshow.schedule}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
