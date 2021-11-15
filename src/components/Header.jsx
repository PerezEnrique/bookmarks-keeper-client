import React from "react";
import { AppBar, Box, InputBase, Stack, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { width } from "@mui/system";

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
				</Toolbar>
			</AppBar>
		</Box>
	);
}
