import PageNotFound from '../utils/pageNotFound.js'

export const FileNotFound = (err, req, res, next) => {
    return next(new PageNotFound())
};
