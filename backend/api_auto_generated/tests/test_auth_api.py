# coding: utf-8

from fastapi.testclient import TestClient


from openapi_server.models.http_validation_error import HTTPValidationError  # noqa: F401
from openapi_server.models.user import User  # noqa: F401


def test_get_user_auth_me_get(client: TestClient):
    """Test case for get_user_auth_me_get

    Get User
    """

    headers = {
    }
    # uncomment below to make a request
    #response = client.request(
    #    "GET",
    #    "/auth/me",
    #    headers=headers,
    #)

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_login_auth_login_post(client: TestClient):
    """Test case for login_auth_login_post

    Login
    """
    params = [("email", 'email_example'),     ("password", 'password_example')]
    headers = {
    }
    # uncomment below to make a request
    #response = client.request(
    #    "POST",
    #    "/auth/login",
    #    headers=headers,
    #    params=params,
    #)

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_logout_auth_logout_post(client: TestClient):
    """Test case for logout_auth_logout_post

    Logout
    """

    headers = {
    }
    # uncomment below to make a request
    #response = client.request(
    #    "POST",
    #    "/auth/logout",
    #    headers=headers,
    #)

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_register_auth_register_post(client: TestClient):
    """Test case for register_auth_register_post

    Register
    """
    params = [("email", 'email_example'),     ("role", 'role_example'),     ("password", 'password_example')]
    headers = {
    }
    # uncomment below to make a request
    #response = client.request(
    #    "POST",
    #    "/auth/register",
    #    headers=headers,
    #    params=params,
    #)

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200

