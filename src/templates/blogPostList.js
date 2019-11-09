import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Pagination = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const PageNumberWrapper = styled.div`
    border: 1px solid #eee;
    background: ${props => props.isCurrentPage ? '#eee' : 'white'}
`;

const PageNumber = styled(Link)`
    display: block;
    text-decoration: none;
    padding: 8px 16px;
    color: rgb(3,27,77);
    font-weight: 700;
`

export default ({ pageContext }) => {
    
    return (
        <Layout>
            {pageContext.posts.map(post => (
                <div style={{ backgroundColor: '#eee', padding: '1rem 1rem', margin: '2rem 1rem', borderRadius: '1rem' }} key={post.node.wordpress_id}>
                    <h2>{post.node.title}</h2>
                    <small>
                        {post.node.date}
                    </small>
                    <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                    <div>
                        <Link to= {`/${post.node.slug}`}>
                            Read More
                        </Link>
                    </div>
                </div> 
            ))}
            <Pagination>
                { Array.from({length: pageContext.numberPages }).map((page, index) => (
                    <PageNumberWrapper key={index} isCurrentPage={index + 1 === pageContext.currentPage }>
                        <PageNumber to={index === 0 ? `/blog` : `/blog/${index + 1}`}>
                            { index + 1 }
                        </PageNumber>
                    </PageNumberWrapper>
                )) }
            </Pagination>
        </Layout>
    )
}