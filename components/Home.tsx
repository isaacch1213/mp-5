"use client"

import { useState } from 'react';
import { Box, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import { Typography, TypographyProps } from "@mui/material";
import createNewUrl from '@/lib/createNewUrl';
import Link from 'next/link';

const StyledBox = styled(Box)`
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1%;
`;

const StyledForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledPaper = styled(Paper)`
    width: 65%;
    height: 80%;
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
`;

const StyledAliasField = styled.input`
    width: auto;
    border: solid;
    padding: 1%;
    border-radius: 5px;
`;

const StyledLinkPlaceholder = styled(Typography)<TypographyProps>`
    display: inline;
    color: gray;
`;

const StyledLink = styled(Link)`
    color: blue;
    text-decoration: underline;

    &:hover {
        text-decoration: none;
    }
`

export default function Home() {
    const [longUrl, setLongUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [resultUrl, setResultUrl] = useState("");

    return (
        <StyledBox>
            <Typography variant="h3" component="h1">
                    Shorten your URL here!
            </Typography>
            <StyledForm
                onSubmit={(e) => {
                    e.preventDefault();
                    setError("");
                    setResultUrl("");

                    createNewUrl(longUrl, alias)
                        .then((res) => {
                            setResultUrl(`https://mp-5-taupe-delta.vercel.app/${res.alias}`);
                        })
                        .catch((err) => {
                            setError(err.message);
                        })
                }}
            >
                <StyledPaper elevation={5}>
                    <ContainerBox>
                        <div>
                            <Typography variant="h5" component="h3">
                                URL
                            </Typography>
                            <StyledUrlField 
                                placeholder="https://example.com/very/long/url"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <Typography variant="h5" component="h3">
                                Custom Alias
                            </Typography>
                            <StyledLinkPlaceholder variant="h6" component="h4">
                                https://mp-5-taupe-delta.vercel.app/
                                <StyledAliasField 
                                    placeholder="custom-alias" 
                                    value={alias}
                                    onChange={(e) => setAlias(e.target.value)}
                                />
                            </StyledLinkPlaceholder>
                        </div>
                        <Button 
                            variant="contained"
                            type="submit"
                        >
                            Shorten
                        </Button>
                        {error && (
                            <Typography variant="h6" component="h3">
                                {error}
                            </Typography>
                        )}
                        {resultUrl && (
                            <Typography variant="h6" component="h3">
                                Your shortened URL: {" "}
                                <StyledLink href={`/${alias}`} target="_blank">
                                    {resultUrl}
                                </StyledLink>
                            </Typography>
                        )}
                    </ContainerBox>
                </StyledPaper>
            </StyledForm>
        </StyledBox>
    );
}
