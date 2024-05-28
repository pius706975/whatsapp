function response(res, status, result = '') {
    let desc = '';
    switch (status) {
        case 200:
            desc = 'OK';
            break;
        case 201:
            desc = 'Created';
            break;
        case 400:
            desc = 'Bad Request';
            break;
        case 401:
            desc = 'Unautorized';
            break;
        case 404:
            desc = 'Not Found';
            break;
        case 500:
            desc = 'Internal Server Error';
            break;
        case 501:
            desc = 'Bad Gateway';
            break;
        case 304:
            desc = 'Not Modified';
            break;
        default:
            desc = '';
    }
    const isObject = (data) => {
        return !!data && data.constructor === Object;
    };
    const results = {
        status,
        description: desc,
        result: isObject(result) ? [result] : result,
    };
    res.status(status).json(results);
}
module.exports = response;
