defmodule Web.PageControllerTest do
  use Web.ConnCase

  alias Nfl.Players.Player
  import Mox

  Mox.defmock(
    Web.PlayerRepositoryMock,
    for: Nfl.Players.PlayerRepository.Behaviour
  )

  setup :verify_on_exit!

  test "GET /", %{conn: conn} do
    Web.PlayerRepositoryMock
    |> expect(:all, fn ->
      %Player{
	name: ":name:",
	team: ":team:"
      }
    |> List.wrap
    end)

    conn =
      conn
      |> put_private(:player_repository, Web.PlayerRepositoryMock)
      |> get( "/")

    page = html_response(conn, 200)
    assert page =~ "NFL Rushing"
    assert page =~ ":name:"
    assert page =~ ":team:"
  end
end
