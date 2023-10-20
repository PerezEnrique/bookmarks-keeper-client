import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
	AppBar,
	Box,
	InputBase,
	Link,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

type HeaderProps = {
	searchText?: string,
	handleSearch?: React.Dispatch<React.SetStateAction<string>>,
	handleClickOnMenu?: () => void
}

export default function Header({
	searchText,
	handleSearch,
	handleClickOnMenu,
} : HeaderProps) {
	const location = useLocation();

	return (
		<Box sx={{ flexGrow: 1 }}>
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
								onChange={(e) => handleSearch && handleSearch(e.target.value)}
								sx={{
									px: 1,
									pt: 0.6,
									pb: 1,
									color: "inherit",
								}}
							/>
						</Stack>
					)}
					<IconButton
						size="large"
						color="inherit"
						aria-label="menu"
						onClick={handleClickOnMenu}
						sx={{ display: { md: "none" }, ml: "auto" }}
					>
						<MenuIcon />
					</IconButton>
					<Box component="nav" sx={{ display: { xs: "none", md: "block" } }}>
						<Link
							to="/home"
							component={RouterLink}
							color="inherit"
							underline="none"
							sx={{ mr: 2 }}
						>
							My bookmarks
						</Link>
						<Link
							to="/profile"
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
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
