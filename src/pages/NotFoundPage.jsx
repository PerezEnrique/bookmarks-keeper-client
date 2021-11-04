import React from 'react';
import { Container, Typography } from '@mui/material';

export default function NotFoundPage() {
	return (
		<Container sx={{ mt: 5 }}>
			<Typography component="h1" variant="h3">
				Page not found
			</Typography>
		</Container>
	);
}
