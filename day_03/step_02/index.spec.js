describe('myApp', () => {

    beforeEach(() => module('myApp'))

    describe('customFilter', () => {
    	var curFilter

    	beforeEach(() => inject((customFilter) => curFilter = customFilter))

	    it('has a custom filter', () => {
	        expect(curFilter).not.toBeNull();
	    })
	    it('should uppercase', () => {
	    	expect(curFilter('bonjour')).toBe('Bonjour')
	    })
	    it('should keep uppercase', () => {
	    	expect(curFilter('Bonjour')).toBe('Bonjour')
	    })	
	    it('should return original value when not a string', () => {
	    	expect(curFilter(12345)).toBe(12345)
	    })	
    })

    describe('separatorFilter', () => {
    	var curFilter

    	beforeEach(() => inject(($filter) => {
    		curFilter = $filter('separator')
    	}))

	    it('has a separator filter', () => {
	        expect(curFilter).not.toBeNull();
	    })
	    it('should join using the default separator', () => {
	    	expect(curFilter(['bonjour', 'Benjamin'])).toBe('bonjour, Benjamin')
	    })	
	    it('should join using the given separator', () => {
	    	expect(curFilter(['bonjour', 'Benjamin'], '- ')).toBe('bonjour- Benjamin')
	    })	
    })
    
})