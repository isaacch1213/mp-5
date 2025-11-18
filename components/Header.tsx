"use client"

import Link from "next/link";
import { Typography, TypographyProps } from "@mui/material";
import styled from "styled-components";

const StyledTypography = styled(Typography)<TypographyProps>`
    height: 10vh;
    display: flex;
    align-items: center;
    padding-left: 1%;
`;

export default function Header() {
    return (
        <header>
            <StyledTypography variant="h5" component="h2" >
                <Link href="/">
                    URL Shortener
                </Link>
            </StyledTypography>
        </header>
    );
}