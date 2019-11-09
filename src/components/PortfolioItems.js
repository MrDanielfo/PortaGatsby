import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';


const PortfolioItemsWrapper = styled.div`
    display: flex;
    flex: wrap;
    justify-content: center;
`;

const PortfolioItem = styled.div`
    width: 300px;
    padding: 16px;
    margin: 16px;
    border: 1px solid #efefef;
`;

const PortfolioImage = styled.img`
    max-width: 100%;
`;



const PortfolioItems = () => (
  <StaticQuery
    query={graphql`
      {
        allWordpressWpPortfolio {
          edges {
            node {
              title
              wordpress_id
              excerpt
              slug
              featured_media {
                source_url
              }
              content
              acf {
                portfolio_url
              }
            }
          }
        }
      }
    `}
    render={props => (
      <PortfolioItemsWrapper>
        {props.allWordpressWpPortfolio.edges.map(portfolioItem => (
          <PortfolioItem key={portfolioItem.node.wordpress_id}>
            <h2>{portfolioItem.node.title}</h2>
            <PortfolioImage
              src={portfolioItem.node.featured_media.source_url}
              alt={portfolioItem.node.title}
            />
            <div
              dangerouslySetInnerHTML={{ __html: portfolioItem.node.excerpt }}
            />
            <Link to={`/portfolio/${portfolioItem.node.slug}`}>Read More</Link>
          </PortfolioItem>
        ))}
      </PortfolioItemsWrapper>
    )}
  ></StaticQuery>
)

export default PortfolioItems
