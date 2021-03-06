import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, image,subtitle, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
      <div>
          <div
              className="full-width-image margin-top-0"
              style={{
                  backgroundImage: `url(${
                      !!image.childImageSharp
                          ? image.childImageSharp.fluid.src
                          : image
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
                          boxShadow:
                              "rgb(0, 0, 0) 0.5rem 0px 0px, rgb(0, 0, 0) -0.5rem 0px 0px",
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
                          boxShadow:
                              "rgb(0, 0, 0) 0.5rem 0px 0px, rgb(0, 0, 0) -0.5rem 0px 0px",
                          backgroundColor: "rgb(0, 0, 0)",
                          color: "white",
                          lineHeight: "1",
                          padding: "0.25em"
                      }}
                  >
                      {subtitle}
                  </h3>
              </div>
          </div>

          <section className="section section--gradient">
              <div className="container">
                  <div className="columns">
                      <div className="column is-10 is-offset-1">
                          <div className="section">
                              <PageContent
                                  className="content"
                                  content={content}
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    contentComponent: PropTypes.func
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
      <Layout>
          <AboutPageTemplate
              contentComponent={HTMLContent}
              title={post.frontmatter.title}
              subtitle={post.frontmatter.subtitle}
              image={post.frontmatter.image}
              content={post.html}
          />
      </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title,
        subtitle,
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
