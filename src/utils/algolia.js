const courseQuery = `{
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/course/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
        }
        excerpt(pruneLength: 5000)
        html
        fields {
          slug
        }
      }
    }
  }
}
`

const unnestFrontmatter = node => {
  const { frontmatter, ...rest } = node

  return {
    ...frontmatter,
    ...rest
  }
}

const queries = [
  {
    query: courseQuery,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(edge => edge.node).map(unnestFrontmatter)
  }
]

module.exports = queries