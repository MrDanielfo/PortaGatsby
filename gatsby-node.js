/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions
    createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser: true, isPermanent: true })

    // The “graphql” function allows us to run arbitrary
    // queries against the local Gatsby GraphQL schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    const result = await graphql(`
      {
        allWordpressPage {
          edges {
            node {
              id
              title
              status
              template
              content
              slug
              template
            }
          }
        }
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
        allWordpressPost {
          edges {
            node {
              title
              slug
              content
              featured_media {
                source_url
              }
              excerpt
              wordpress_id
              date(formatString: "Do MMM YYYY HH:mm")
            }
          }
        }
      }
    `)

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors)
    }

    // Access query results via object destructuring
    const { allWordpressPage, allWordpressWpPortfolio, allWordpressPost } = result.data

    // Create Page pages.
    const pageTemplate = path.resolve(`./src/templates/page.js`)
    const portfolioContentTemplate = path.resolve(`./src/templates/portfoliocontent.js`)
    // We want to create a detailed page for each page node.
    // The path field contains the relative original WordPress link
    // and we use it for the slug to preserve url structure.
    // The Page ID is prefixed with 'PAGE_'
    allWordpressPage.edges.forEach(edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        const template = edge.node.template
        createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(template === 'portfolio.php' ? portfolioContentTemplate : pageTemplate),
            context: edge.node,
        })
    })

    const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`)
    // We want to create a detailed page for each post node.
    // The path field stems from the original WordPress link
    // and we use it for the slug to preserve url structure.
    // The Post ID is prefixed with 'POST_'
    allWordpressWpPortfolio.edges.forEach(edge => {
        createPage({
            path: `/portfolio/${edge.node.slug}`,
            component: slash(portfolioTemplate),
            context: edge.node,
        })
    })

    const blogPostListTemplate = path.resolve(`./src/templates/blogPostList.js`);
    const posts = allWordpressPost.edges;
    const postsPerPage = 2;
    const numberPages = Math.ceil(posts.length / postsPerPage);

    Array.from({length: numberPages}).forEach((page, index) => {
      createPage({
        path: index === 0 ? `/blog` : `/blog/${index + 1}`,
        component: slash(blogPostListTemplate),
        context: {
          posts: posts.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
          numberPages,
          currentPage: index + 1
        }
      })
    })

    const postTemplate = path.resolve(`./src/templates/post.js`);
    posts.forEach(edge => {
      createPage({
        path: `/${edge.node.slug}`,
        component: slash(postTemplate),
        context: edge.node,
      })
    });
}


// {
//     id: edge.node.id,
// }
