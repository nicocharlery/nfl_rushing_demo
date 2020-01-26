defmodule Web.PageControllerTest do
  use Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")

    page = html_response(conn, 200)
    assert page =~ "NFL Rushing"
    assert page =~ "JAX"
    assert page =~ "Joe Banyard"
  end
end
