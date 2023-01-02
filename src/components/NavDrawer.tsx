import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, List, ListItem } from "@mui/material";

export default function DrawerContent() {
	return (
		<Box sx={{ width: 250 }} role="presentation">
			<Box component="nav">
				<List>
					<ListItem>
						<Link
							to="/home"
							component={RouterLink}
							color="inherit"
							underline="none"
							sx={{ mr: 2 }}
						>
							My bookmarks
						</Link>
					</ListItem>
					<ListItem>
						<Link
							to="/profile"
							component={RouterLink}
							color="inherit"
							underline="none"
							sx={{ mr: 2 }}
						>
							Profile
						</Link>
					</ListItem>
					<ListItem>
						<Link
							to="/log-out"
							component={RouterLink}
							color="inherit"
							underline="none"
							sx={{ mr: 2 }}
						>
							Log out
						</Link>
					</ListItem>
				</List>
			</Box>
		</Box>
	);
}
