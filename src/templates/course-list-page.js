import React from "react";
import { Link, graphql } from 'gatsby'
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import { FaPlay } from 'react-icons/fa';

import "assets/scss/material-kit-react.scss?v=1.4.0";
import 'typeface-roboto';
import 'typeface-roboto-slab';

import Layout from "components/Layout/Layout.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import FadeDrop from "components/FadeDrop/FadeDrop.jsx"


import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

const _ = require('lodash')

class CourseListPage extends React.Component {
  
  render() {
    const { classes, ...rest } = this.props;
    const pageData  = this.props.data.markdownRemark.frontmatter;
    const allCourse = this.props.data.allMarkdownRemark.edges;
    let directories = [];

    allCourse.forEach(edge => {
      const path = edge.node.fields.slug.split('/')
      directories.push(path[2])
    })
      
    directories = _.uniq(directories)

    
    return (
      <Layout >
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10}>
                <h1 className={classes.title}>{ pageData.title }</h1>
                <br />
                <br />
                <h4>{pageData.description}</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classNames(classes.container, classes.py)}>
            {
              directories.map((item, i)=> {
                const name = item.charAt(0).toUpperCase() + item.slice(1)
                const directory = name.split('-').join(' ')
                
                return(
                  <div className={classes.listItem} key={i}>
                    <FadeDrop title={directory} path={item} data={allCourse} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(landingPageStyle)(CourseListPage);

export const pageQuery = graphql`
  query CourseListPage {
    markdownRemark(frontmatter: {templateKey: {eq: "course-list-page"}}) {
      frontmatter {
        title
        description
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
