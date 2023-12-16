class PageNotFound extends Error{
    constructor(){
        super();
        this.message="page not found",
        this.statusCode = 404
    }
}

export default PageNotFound;