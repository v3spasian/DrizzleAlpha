import React, { Component } from 'react'
import { Link } from "gatsby"
import styled from "styled-components"
import triangle from "assets/img/triangle.png"

const DropButtonText = styled.div`
	width: calc(100% - 30px);
	display: inline-block;
	& :hover {
		cursor: pointer;
	}
`

const DropButtonImg = styled.div`
	width: 30px;
	display: inline-block;
	& img {
		float: left;
		width: 18px;
		transform: ${props=>(props.isVisible ? "rotate(0deg)" : "rotate(-90deg)")};
		transition: all .3s ease;
	}
`
const FadeContent = styled.div`
	display: ${props=>(props.isVisible ? "block" : "none")};
	padding: 10px 30px;
`

const LinkItem = styled.div`
	margin: 10px 0;
	& a {
		text-decoration: none;
		font-size: 18px;
		color: black;
	}
	& input {
		vertical-align: middle;
		margin: 5px;
		width: 15px;
	}
`

class FadeDrop extends Component {
	constructor(props){
		super(props)
		this.state = {
			isVisible: false
		}
		this.handleFade=this.handleFade.bind(this)
	}
	handleFade() {
		const nextState = !this.state.isVisible
		this.setState({
			isVisible: nextState
		})
	}
	componentDidMount() {
		const {title, path, data} = this.props
		if (path === window.history.state.data) {
    	this.setState({
    		isVisible: true
    	})
    }
	}
	render() {
		const {isVisible} = this.state
		const {title, path, data, activePath} = this.props

		let courseList = [];

    data.forEach(edge => {
      const course = edge.node.fields.slug.split('/')
      if ( course[2] === path ) {
      	courseList.push(edge)
      }
    })

		return(
			<div>
				<div onClick={this.handleFade} isVisible={isVisible} >
					<DropButtonImg isVisible={isVisible}>
						<img src={ triangle } alt="drop arrow" />
					</DropButtonImg>
					<DropButtonText>
						{ title }
					</DropButtonText>
				</div>
				<FadeContent isVisible={isVisible}> 
					{
						courseList.map((item, i) => {
							return(
								<LinkItem>
									<input type="radio" />
									<Link to={item.node.fields.slug} >
										{item.node.frontmatter.title}
									</Link>
								</LinkItem>
							)
						})
					}
				</FadeContent>
			</div>
		)
	}
}

export default FadeDrop