import React from "react";
import { Link } from 'gatsby'
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from 'styled-components'

import Layout from "components/Layout/Layout.jsx";
import Button from "components/CustomButtons/Button.jsx";
import coursePageStyle from "assets/jss/material-kit-react/views/coursePage.jsx";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  padding: 10px 50px 20px;
  left: 0;
  width: 100%;
`
const NextButton = styled.span`
  float: right;
`

class CoursePage extends React.Component {
 
  renderButton() {
    const courseData  = this.props.data.markdownRemark
    const allCourse = this.props.data.allMarkdownRemark
    let prevCourse = []
    let nextCourse = []
    allCourse.edges.forEach((edge, i)=>{
      if (edge.node.frontmatter.title === courseData.frontmatter.title) {
        if (i=== 0 ) {
          prevCourse.push("none");
          nextCourse.push(allCourse.edges[i+1]);
        } else if(i>0 && i < allCourse.edges.length-1) {
          prevCourse.push(allCourse.edges[i-1]);
          nextCourse.push(allCourse.edges[i+1]);
        } else {
          prevCourse.push(allCourse.edges[i-1]);
          nextCourse.push("none")
        }
      }
    })
    if(prevCourse[0]==="none"){
      return(
        <ButtonWrapper>
          <Link to={nextCourse[0].node.fields.slug}>
            <NextButton>
              <Button color="primary">Next</Button>
            </NextButton>
          </Link>
        </ButtonWrapper>
      )
    } else if (nextCourse[0]==="none") {
      return(
        <ButtonWrapper>
          <Link to={prevCourse[0].node.fields.slug}>
            <Button color="primary">Previous</Button>
          </Link>
        </ButtonWrapper>
      )
    } else {
      return(
        <ButtonWrapper>
          <Link to={prevCourse[0].node.fields.slug}>
            <Button color="primary">Previous</Button>
          </Link>
          <Link to={nextCourse[0].node.fields.slug}>
            <NextButton>
              <Button color="primary">Next</Button>
            </NextButton>
          </Link>
        </ButtonWrapper>
      )
    }
  }
  
  render() {
    const { classes, ...rest } = this.props;
    const courseData  = this.props.data.markdownRemark
    
    return (
     <Layout {...rest}>
        <div className={classNames(classes.main, classes.mainRaised)} style={{marginTop: 200}}>
          <div className={classes.container}>
            <h2 className={classes.title}>{courseData.frontmatter.title} </h2>
            <div dangerouslySetInnerHTML={{ __html: courseData.html }} />
            <div>
              {this.renderButton()}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(coursePageStyle)(CoursePage);

export const pageQuery = graphql`
  query CourseByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: {templateKey: {eq: "course-page"}}},
      sort: { order: ASC, fields: [frontmatter___order] },
    ){
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
            title
            order
          }
        }
      }
    }
  }
`