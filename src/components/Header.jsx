import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, InputBase, Link, Stack, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ location, searchText, handleSearch }) {
	return (
		<Box sx={{ flexGrow: 1 }} component="header">
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						Bookmarks keeper
					</Typography>
					{location.pathname === "/home" && (
						<Stack
							direction="row"
							alignItems="center"
							sx={{
								width: "12rem",
								mr: 2,
								borderRadius: 1,
								bgcolor: "text.disabled",
								":hover": { bgcolor: "text.secondary" },
							}}
						>
							<Box
								component="div"
								sx={{
									mr: -2.5,
									mb: 0.5,
									px: 2,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<SearchIcon />
							</Box>
							<InputBase
								placeholder="Search..."
								inputProps={{ "aria-label": "search" }}
								value={searchText}
								onChange={(e) => handleSearch(e.target.value)}
								sx={{
									px: 1,
									pt: 0.6,
									pb: 1,
									color: "inherit",
								}}
							/>
						</Stack>
					)}
					<Link
						to="#"
						component={RouterLink}
						color="inherit"
						underline="none"
						sx={{ mr: 2 }}
					>
						Profile
					</Link>
					<Link
						to="/log-out"
						component={RouterLink}
						color="inherit"
						underline="none"
						sx={{ mr: 2 }}
					>
						Log out
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
