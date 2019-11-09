import React from "react"
import Layout from "../components/layout"
import PortfolioItems from "../components/PortfolioItems"

export default props => {
  const { pageContext } = props
  console.log(pageContext)
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: pageContext.title }} />
      <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />

      <PortfolioItems />
    </Layout>
  )
}

