from flask import jsonify


def success_response(data=None, message="Success", status=200):
    """
    Standard success response
    """

    return jsonify({
        "status": "success",
        "message": message,
        "data": data
    }), status


def error_response(message="Error", status=400):
    """
    Standard error response
    """

    return jsonify({
        "status": "error",
        "message": message
    }), status