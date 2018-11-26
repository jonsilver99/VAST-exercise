
class ResponseHandler {

    static success(res, status, message, data) {
        return res.status(status).send({
            success: true,
            message: message,
            data: data,
        });
    }

    static error(res, status, message, errdata) {
        return res.status(status).send({
            success: false,
            message: (errdata.message) ? `${message} - ${errdata.message}` : message,
            errData: errdata,
        });
    }
}

module.exports = ResponseHandler;