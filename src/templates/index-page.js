import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Content, { HTMLContent } from "../components/Content"

import Layout from "../components/Layout"
import BlogRoll from "../components/BlogRoll"

export const IndexPageTemplate = ({ image, title, subheading, content, contentComponent }) => {
  const PageContent = contentComponent || Content

    return (
        <div>
            <div
                className="full-width-image margin-top-0"
                style={{
                    backgroundImage: `url(${
                        !!image.childImageSharp ? image.childImageSharp.fluid.src : image
                    })`,
                    backgroundPosition: `top left`,
                    backgroundAttachment: `fixed`
                }}
            >
                <div
                    style={{
                        display: "flex",
                        height: "150px",
                        lineHeight: "1",
                        justifyContent: "space-around",
                        alignItems: "left",
                        flexDirection: "column"
                    }}
                >
                    <h1
                        className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                        style={{
                            boxShadow: "rgb(0, 0, 0) 0.5rem 0px 0px, rgb(0, 0, 0) -0.5rem 0px 0px",
                            backgroundColor: "rgb(0, 0, 0)",
                            color: "white",
                            lineHeight: "1",
                            padding: "0.25em"
                        }}
                    >
                        {title}
                    </h1>
                    <h3
                        className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                        style={{
                            boxShadow: "rgb(0, 0, 0) 0.5rem 0px 0px, rgb(0, 0, 0) -0.5rem 0px 0px",
                            backgroundColor: "rgb(0, 0, 0)",
                            color: "white",
                            lineHeight: "1",
                            padding: "0.25em"
                        }}
                    >
                        {subheading}
                    </h3>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="section section--gradient">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <PageContent className="content" content={content} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-12">
                        <h3 className="has-text-weight-semibold is-size-2">Latest Posts</h3>
                        <BlogRoll />
                        <div className="column is-12 has-text-centered">
                            <Link className="btn" to="/blog">
                                Read more
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    subheading: PropTypes.string,
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.func
}

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <IndexPageTemplate
                contentComponent={HTMLContent}
                image={frontmatter.image}
                title={frontmatter.title}
                subheading={frontmatter.subheading}
                content={data.markdownRemark.html}
            />
        </Layout>
    )
}

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            html
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                subheading
            }
        }
    }
`
