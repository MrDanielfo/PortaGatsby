import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';

const FeaturedImage = styled.img`
    max-width: 100%;
    width: 300px;
    margin: 16px 0;
`;

const Post = ({ pageContext }) => {
    return (
        <Layout>
            <h1>{pageContext.title}</h1>
            <small>
                {pageContext.date}
            </small>
            <div>
                <FeaturedImage
                    src={pageContext.featured_media.source_url}
                    alt={pageContext.title}
                />
            </div>
            <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
    )
}

export default Post;
