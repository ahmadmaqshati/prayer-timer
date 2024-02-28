import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function Prayer({ prayerName, prayerTime, img }) {

    return (
        <>
            <Card sx={{ maxWidth: 345, marginTop: "40px", width: "260px" }}>
                <CardMedia
                    sx={{ height: 140 }}


                    image={img}


                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6">
                        {prayerName}
                    </Typography>
                    <Typography variant="h2" style={{ color: "black" }}>
                        {prayerTime}
                    </Typography>
                </CardContent>

            </Card>
            {/*  */}

        </>
    )
}