"use client"

import { Box, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import { Typography, TypographyProps } from "@mui/material";
import Link from 'next/link';

const StyledBox = styled(Box)`
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2%;
`;

const StyledPaper = styled(Paper)`
    width: 65%;
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
`;

const ContainerBox = styled(Box)`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5%;
`;

const StyledUrlField = styled.input`
    width: 100%;
    border: solid;
    padding: 1%;
    border-radius: 5px;
`

const StyledAliasField = styled.input`
    width: auto;
    border: solid;
    padding: 1%;
    border-radius: 5px;
`

const StyledLinkPlaceholder = styled(Typography)<TypographyProps>`
    display: inline;
    color: gray;
`

export default function Home() {
    return (
        <StyledBox>
            <Typography variant="h2" component="h1">
                    Shorten a URL here!
            </Typography>
            <StyledPaper elevation={2}>
                <ContainerBox>
                    <div>
                        <Typography variant="h5" component="h3">
                            URL
                        </Typography>
                        <StyledUrlField id="url-input" placeholder="https://example.com/very/long/url" />
                    </div>
                    <div>
                        <Typography variant="h5" component="h3">
                            Custom Alias
                        </Typography>
                        <StyledLinkPlaceholder variant="h6" component="h4">
                            https://localhost:3000/ <StyledAliasField id="alias" placeholder="custom-alias" />
                        </StyledLinkPlaceholder>
                    </div>
                    <Button variant="contained">
                        Shorten
                    </Button>
                </ContainerBox>
            </StyledPaper>
        </StyledBox>
    );
}