import React from 'react'
import { Link } from "gatsby"
import algoliasearch from 'algoliasearch/lite'
import { connectHits, InstantSearch, SearchBox, Highlight } from 'react-instantsearch-dom'
import styled from "styled-components"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

// Please note, that to get the `css` prop to work, you'll either
// need to add a jsx pragma or use a babel plugin. Consult the
// Emotion documentation for setting that up for your project.

const Result = styled.div`
  width: 400px;
  height: 300px;
  position: absolute;
  background: white;
  color: black;
  padding: 15px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
`

const CustomSearchBox = styled(SearchBox)`
  .ais-SearchBox-form {
    margin-bottom: 5px;
  }
  & input {
    font-size: 20px;
  }
  & button {
    display: none;
  }
`

const Hits = connectHits(({ hits }) => (
  <Result>
    {hits.length ? (
      <>
        {hits.map(hit => {
          return (
            <div  key={hit.objectID}>
              <Link
                css={{ display: 'block', marginBottom: "20px" }}
                to={hit.fields.slug}
              >
                <h4 css={{ marginBottom: 0 }}>
                  <Highlight attribute="title" hit={hit} tagName="strong" />
                </h4>
                {hit.subtitle ? (
                  <h5 css={{ marginBottom: 0 }}>
                    <Highlight
                      attribute="subtitle"
                      hit={hit}
                      tagName="strong"
                    />
                  </h5>
                ) : null}
              </Link>
              <div>
                <Highlight attribute="excerpt" hit={hit} tagName="strong" />
              </div>
            </div>
          )
        })}
      </>
    ) : (
      <p>There were no results for your query. Please try again.</p>
    )}
  </Result>
))

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch(e) {
    if(e.target.value != ""){
      this.setState({
        isVisible: true
      })
    } else {
      this.setState({
        isVisible: false
      })
    }
  }
  render(){
   return (
      <InstantSearch
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <CustomSearchBox 
          onChange={this.handleSearch}
        />
        <div style={this.state.isVisible?{display: "block"} : {display: "none"}}>
          <Hits  />
        </div>
      </InstantSearch>
    )
  }
}