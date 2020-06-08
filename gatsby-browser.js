export const onClientEntry = () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (typeof window === 'undefined') {
	    global.window = {}
	}
}