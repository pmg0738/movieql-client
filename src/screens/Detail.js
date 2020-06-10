import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 20px;
`;

const Poster = styled.div`
  width: 16.5%;
  height: 43%;
  background-color: transparent;
  background-image: url(${props => props.bg});
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id)}
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading.."
            : `${data.movie.title}`
            }
        </Title>
        <Subtitle>
          {data?.movie.language}   {data?.movie.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};